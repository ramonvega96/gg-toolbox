import * as fs from 'fs/promises';
import path from 'path';
import Papa, { ParseResult } from 'papaparse';
import { convertPublicServiceDocs } from './util/validatePublicServices';
import { Resource } from './util/types/Resource';
import {
    HealthProfessional,
    PublicServicesOffer,
    PublicServicesByState,
    HospitalPublicServices,
} from './util/types/FHP';
import { objToCsvRecord, validateURLFormat } from './util/validateLinks';
import * as vr from './util/validateResources';
import { rawResourceKeys } from './util/types/RawResource';

const resourceObjects: Resource[] = [];
const healthProfessionalObjects: HealthProfessional[] = [];
const publicServices: HospitalPublicServices[] = [];

// Job professions to be populated with public service info
const publicServicesOffer: PublicServicesOffer = {
    dietitian: [],
    speechPathologist: [],
    occupationalTherapist: [],
    mentalHealth: [],
    physiotherapist: [],
    socialWorker: [],
    lactationConsultant: [],
};

const publicServicesByState = Object.fromEntries(
    ['nsw', 'qld', 'vic', 'act', 'tas', 'sa', 'wa', 'nt'].map((state) => [
        state,
        JSON.parse(JSON.stringify(publicServicesOffer)),
    ])
);

export const seedingLogs = `${__dirname}/data/seeding-logs`;

/**
 * This is a revision for Papa.parse to handle the asynchronous functions
 * from the fs library
 * @param csv the csv data using fs read
 * @param modifier the function that runs over the csv file. It must take a 'results' and 'resolve' parameter
 * @returns a promise using Papa.parse
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const papaParsePromise = (csv: string, modifier: Function) => {
    try {
        return new Promise(function (resolve, reject) {
            Papa.parse(csv, {
                header: true,
                transformHeader: (h) => h.trim(),
                skipEmptyLines: true,
                complete: async (results) => {
                    try {
                        await modifier(results, resolve);
                    } catch (error) {
                        reject(new Error(error.message));
                    }
                },
                error: (error: Error) => {
                    reject(new Error(error.message));
                },
            });
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

const getCSVFolders = async () => {
    const folderPath = `${__dirname}/data/seeding-files`;
    const getFolders = await fs.readdir(folderPath);

    const filePaths = {
        resourcesPath: '',
        healthProfessionalsPath: '',
        publicServicesPath: '',
    };

    const filePatterns = new Map([
        ['resourcesPath', 'nutbox_data_'],
        ['healthProfessionalsPath', 'health_professional_'],
        ['publicServicesPath', 'public_services_'],
    ]);

    for (const file of getFolders) {
        for (const [path, pattern] of filePatterns) {
            if (file.includes(pattern)) {
                filePaths[
                    path as keyof typeof filePaths
                ] = `${folderPath}/${file}`;
                break;
            }
        }
    }

    return filePaths;
};

const convertToFile = async (filePath: string) => {
    const file = await fs.readFile(path.join(filePath), 'utf-8');
    return file;
};

export const validateResourcesDataIntegrity = (resources: Resource[]) => {
    vr.validateUniqueResourceIds(resources);
    vr.validateUniqueVersions(resources);
    vr.validateTranslatedSubidsCorrectness(resources);
    vr.validateTranslatedVersionsExist(resources);
    vr.validateOriginalVersionExists(resources);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildResourceObj = async (doc: any) => {
    const criteriaKeys = [
        'crit_1',
        'crit_2',
        'crit_3',
        'crit_4',
        'crit_5',
        'crit_6',
        'crit_7',
        'crit_8',
    ];

    const scoreCriteria = criteriaKeys.map((key) => {
        const value = doc[key].trim();
        return !isNaN(value) && value !== '' ? +value : 0;
    });

    return {
        resourceId: vr.validateResourceId(doc.resourceId),
        resourceTitle: vr.validateResourceTitle(doc.resourceTitle),
        resourceLink: vr.validateResourceLink(doc.resourceLink),
        suite: vr.validateSuite(doc.suite),
        suiteLink: vr.validateSuiteLink(doc.suiteLink),
        publisher: vr.validatePublisher(doc.publisher),
        publisherLogo: vr.validatePublisherLogo(doc.publisherLogo),
        publicationDate: vr.validatePublicationDate(doc.publicationDate),
        resourceType: vr.validateResourceType(doc.resourceType),
        resourceDescription: vr.validateResourceDescription(
            doc.resourceDescription
        ),
        category: vr.validateCategory(doc.category),
        subcategory: vr.validateSubcategory(doc.subcategory),
        audience: vr.validateAudience(doc.audience),
        ageGroup: vr.validateAgeGroup(doc.ageGroup),
        translatedId: vr.validateTranslatedId(doc.translatedId),
        translatedSubid: vr.validateTranslatedSubid(
            doc.translatedId,
            doc.translatedSubid
        ),
        language: vr.validateLanguage(doc.language),
        languageDisplay: vr.validateLanguageDisplay(doc.languageDisplay),
        culture: vr.validateCulture(doc.culture),
        hidden: vr.validateHidden(doc.hidden),
        state: vr.validateState(doc.state),
        tags: vr.validateTags(doc.tags),
        likesCount: vr.validateScore(doc.userScore, 'likesCount'),
        dislikesCount: vr.validateScore(doc.userScore, 'dislikesCount'),
        userScore:
            vr.validateScore(doc.userScore, 'likesCount') -
            vr.validateScore(doc.userScore, 'dislikesCount'),
        score: scoreCriteria.reduce(function (total, current) {
            return total + current;
        }, 0),
        scoreCriteria: scoreCriteria,
        original: vr.validateOriginal(doc.translatedId, doc.translatedSubid),
    } as Resource;
};

const arraysContainSameFields = (arr1: string[], arr2: string[]) => {
    const errMsg = `Please review the CSV headers as they contain an error. Expected CSV headers are:
        ${rawResourceKeys
            .toString()
            .replace(
                /,/g,
                ', '
            )}. You can use the export feature above to download a copy you can work on.`;

    if (arr1.length !== arr2.length) {
        throw new Error(errMsg);
    }

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    for (const item of set1) {
        if (!set2.has(item)) {
            throw new Error(errMsg);
        }
    }
};

export const loadResourcesData = async (
    resourcesPath: string,
    endpointCall: boolean,
    resourcesArr: Resource[] = resourceObjects
) => {
    // convert resources csv file
    const csvResourceFile = await convertToFile(resourcesPath);

    await papaParsePromise(
        csvResourceFile, // eslint-disable-next-line
        async (results: ParseResult<any>, resolve: Function) => {
            const fields = results.meta.fields as string[];
            arraysContainSameFields(fields, rawResourceKeys);

            if (!endpointCall)
                await fs.writeFile(
                    `${seedingLogs}/resources_log.csv`,
                    `${fields?.toString()},error\n`
                );

            for (const [index, doc] of results.data.entries()) {
                try {
                    const resource: Resource = await buildResourceObj(doc);
                    resourcesArr.push(resource);
                } catch (e) {
                    if (endpointCall)
                        throw new Error(
                            `Error in line ${index + 2}: ` + e.message
                        );
                    console.error(e.message);
                    await fs.appendFile(
                        `${seedingLogs}/resources_log.csv`,
                        `${objToCsvRecord(doc)},${e.message}\n`
                    );
                }
            }
            resolve(resourcesArr);
        }
    );

    try {
        validateResourcesDataIntegrity(resourcesArr);
    } catch (error) {
        if (endpointCall) throw new Error(error.message);
        console.error(error.message);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildHospitalPublicServicesObj = (doc: any) => {
    return {
        hospitalName: doc.hospitalName.trim().replace(/\r?\n|\r/g, ''),
        state: doc.state.trim().toLowerCase(),
        lactationConsultant: doc.lactationConsultant,
        lcLink: doc.lcLink,
        dietitian: doc.dietitian,
        dietitianLink: doc.dietitianLink,
        speechPathologist: doc.speechPathologist,
        spLink: doc.spLink,
        occupationalTherapist: doc.occupationalTherapist,
        otLink: doc.otLink,
        mentalHealth: doc.mentalHealth,
        mhLink: doc.mhLink,
        physiotherapist: doc.physiotherapist,
        physiotherapistLink: doc.physiotherapistLink,
        socialWorker: doc.socialWorker,
        swLink: doc.swLink,
        genericLink: doc.genericLink,
    } as HospitalPublicServices;
};

const loadPublicServicesData = async (publicServicesPath: string) => {
    // convert public services csv file
    const csvPublicServicesFile = await convertToFile(publicServicesPath);

    await papaParsePromise(
        csvPublicServicesFile, // eslint-disable-next-line
        async (results: ParseResult<any>, resolve: Function) => {
            const fields = results.meta.fields as string[];
            const errorHeaders = fields.filter(
                (field) => field !== 'phone' && field !== 'address'
            );

            await fs.writeFile(
                `${seedingLogs}/public_services_log.csv`,
                `${errorHeaders?.toString()},error\n`
            );

            for (const doc of results.data) {
                try {
                    const hospitalPublicServices: HospitalPublicServices =
                        buildHospitalPublicServicesObj(doc);
                    publicServices.push(hospitalPublicServices);
                } catch (e) {
                    console.error(e.message);
                    await fs.appendFile(
                        `${seedingLogs}/public_services_log.csv`,
                        `${objToCsvRecord(doc)},${e.message}`
                    );
                }
            }
            resolve(publicServices);
        }
    );
};

const callProfessionPublicService = (state: string, profession: string) => {
    if (state !== 'generic') {
        switch (profession) {
            case 'dietitian':
                return publicServicesByState[state].dietitian;
            case 'speech pathologist':
                return publicServicesByState[state].speechPathologist;
            case 'occupational therapist':
                return publicServicesByState[state].occupationalTherapist;
            case 'psychologist':
                return publicServicesByState[state].mentalHealth;
            case 'paediatric psychologist':
                return publicServicesByState[state].mentalHealth;
            case 'physiotherapist':
                return publicServicesByState[state].physiotherapist;
            case 'social worker':
                return publicServicesByState[state].socialWorker;
            case 'lactation consultant':
                return publicServicesByState[state].lactationConsultant;
            default:
                return 'null';
        }
    }
    return 'null';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildHealthProfessionalObj = async (doc: any) => {
    return {
        profession: doc.profession.toLowerCase(),
        description: doc.description,
        state: doc.state.toLowerCase(),
        publicService:
            doc.publicService === 'null'
                ? callProfessionPublicService(
                      doc.state.toLowerCase(),
                      doc.profession.toLowerCase()
                  )
                : JSON.parse(doc.publicService),
        privateService: (await validateURLFormat(
            `${seedingLogs}/health_professional_log.csv`,
            doc,
            doc.privateService.trim()
        ))
            ? await validateURLFormat(
                  `${seedingLogs}/health_professional_log.csv`,
                  doc,
                  doc.privateService.trim()
              )
            : 'null',
        communityService:
            doc.communityService === 'null'
                ? 'null'
                : JSON.parse(doc.communityService),
        tags: JSON.parse(doc.tags)
            .map((s: string) => s.trim().toLowerCase())
            .filter((n: string) => n),
    } as HealthProfessional;
};

const loadFHPData = async (healthProfessionalsPath: string) => {
    // convert the health professional csv file
    const csvHealthProfessionalsFile = await convertToFile(
        healthProfessionalsPath
    );

    for (const publicService of publicServices) {
        try {
            await convertPublicServiceDocs(
                publicServicesByState as PublicServicesByState,
                publicService,
                `${seedingLogs}/public_services_log.csv`
            );
        } catch (e) {
            await fs.appendFile(
                `${seedingLogs}/public_services_log.csv`,
                `${objToCsvRecord(publicService)},${e.message} \n`
            );
        }
    }

    await papaParsePromise(
        csvHealthProfessionalsFile, // eslint-disable-next-line
        async (results: ParseResult<any>, resolve: Function) => {
            const fields = results.meta.fields as string[];

            await fs.writeFile(
                `${seedingLogs}/health_professional_log.csv`,
                `${fields?.toString()},error\n`
            );

            for (const doc of results.data) {
                try {
                    const healthProfessional: HealthProfessional =
                        await buildHealthProfessionalObj(doc);
                    healthProfessionalObjects.push(healthProfessional);
                } catch (e) {
                    console.error(e.message, doc);
                    await fs.appendFile(
                        `${seedingLogs}/health_professional_log.csv`,
                        `${Object.values(doc).toString().replace('\n', '')},${
                            e.message
                        } \n`
                    );
                }
            }
            resolve(healthProfessionalObjects);
        }
    );
};

export const getCSVContents = async () => {
    const { resourcesPath, healthProfessionalsPath, publicServicesPath } =
        await getCSVFolders();

    await loadResourcesData(resourcesPath, false);
    await loadPublicServicesData(publicServicesPath);
    await loadFHPData(healthProfessionalsPath);
    return {
        resourceCollection: resourceObjects,
        healthProfessionalCollection: healthProfessionalObjects,
    };
};
