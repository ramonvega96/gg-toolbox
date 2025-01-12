import { MongoClient, Collection } from 'mongodb';
import { validateURLResponse } from './validateLinks';
import { ILink, Service } from './types/FHP';
import config from '../../../config.json';
import path from 'path';
import * as fs from 'fs/promises';
import { sendMail } from '../../../src/helpers/EmailHelper';

const parentDir = path.dirname(__dirname);
const linksTestingLogs = `${parentDir}/data/links-testing-logs`;

const testResourcesLinks = async (resourceCollection: Collection) => {
    // The file in which we want to keep the broken links
    const resourcesLinksLogs = `${linksTestingLogs}/resources_links_logs.csv`;

    // All resources in the database (resourceId and links only)
    const resources = await resourceCollection
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    resourceId: 1,
                    resourceLink: 1,
                    suiteLink: 1,
                },
            }
        )
        .toArray();

    interface RelevantObj {
        resourceId: number;
        property: string;
        brokenLink: string;
    }

    // The csv headers matching the reloevant obj interface
    const fields = ['resourceId', 'property', 'brokenLink'];

    // Create the file with the headers adding "errorMessage" and "errorCode" column
    await fs.writeFile(
        resourcesLinksLogs,
        `${fields.toString()},errorMessage,errorCode\n`
    );

    // Asynchronously verify url responses for resource suites
    const suiteLinkPromises = resources.map(async (resource) => {
        const relevantObj: RelevantObj = {
            resourceId: resource.resourceId,
            property: 'suiteLink',
            brokenLink: resource.suiteLink,
        };
        await validateURLResponse(
            resourcesLinksLogs,
            relevantObj,
            resource.suiteLink
        );
    });

    await Promise.all(suiteLinkPromises);

    // Asynchronously verify url responses for resource links
    const resourceLinkPromises = resources.map(async (resource) => {
        const relevantObj: RelevantObj = {
            resourceId: resource.resourceId,
            property: 'resourceLink',
            brokenLink: resource.resourceLink,
        };
        await validateURLResponse(
            resourcesLinksLogs,
            relevantObj,
            resource.resourceLink
        );
    });

    await Promise.all(resourceLinkPromises);
    process.stdout.write('\r \r');
    console.info('\u2713 Broken links step: Resources');
};

const testPrivateServicesLinks = async (
    healthProfessionCollection: Collection
) => {
    // The file in which we want to keep the broken links
    const privateServicesLinksLogs = `${linksTestingLogs}/private_services_links_logs.csv`;

    // All health professions in the database (private service link, profession and state)
    const healthProfessions = await healthProfessionCollection
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    privateService: 1,
                    profession: 1,
                    state: 1,
                },
            }
        )
        .toArray();

    // Get the csv headers from the first healthProfessions in healthProfessions array
    const fields = Object.keys(healthProfessions[0]);

    // Create the file with the headers adding "errorMessage" and "errorCode" column
    await fs.writeFile(
        privateServicesLinksLogs,
        `${fields.toString()},errorMessage,errorCode\n`
    );

    // Asynchronously verify url responses for health professions private service
    const promises = healthProfessions.map(async (healthProfession) => {
        if (!healthProfession.privateService.includes('null')) {
            await validateURLResponse(
                privateServicesLinksLogs,
                healthProfession,
                healthProfession.privateService
            );
        }
    });

    await Promise.all(promises);
    process.stdout.write('\r \r');
    console.info('\u2713 Broken links step: Private services');
};

const testPublicServicesLinks = async (
    healthProfessionCollection: Collection
) => {
    // The file in which we want to keep the broken links
    const publicServicesLinksLogs = `${linksTestingLogs}/public_services_links_logs.csv`;

    // All public service objects in the database
    const publicServicesRaw = await healthProfessionCollection
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    publicService: 1,
                },
            }
        )
        .toArray();

    // Unwrap hospital public services names and links
    const allHospitalPublicServices = publicServicesRaw
        .filter((healthProfession) =>
            Array.isArray(healthProfession.publicService)
        )
        .map((healthProfession) => healthProfession.publicService)
        .reduce((accumulator, currentList) => accumulator.concat(currentList));

    // Remove duplicates
    const hospitalPublicServices = [
        ...new Set(
            allHospitalPublicServices.map((obj: ILink[]) => JSON.stringify(obj))
        ),
    ].map((str) => JSON.parse(str as string));

    // Create the file with the headers adding "errorMessage" and "errorCode" column
    await fs.writeFile(
        publicServicesLinksLogs,
        'service,url,errorMessage,errorCode\n'
    );

    // Asynchronously verify url responses for health professions public services
    const hospitalsPromises = hospitalPublicServices.map(
        async (publicService: ILink) => {
            await validateURLResponse(
                publicServicesLinksLogs,
                publicService,
                publicService.link
            );
        }
    );

    await Promise.all(hospitalsPromises);

    // Unwrap other public services links
    const allOtherPublicServices = publicServicesRaw
        .filter(
            (healthProfession) =>
                !Array.isArray(healthProfession.publicService) &&
                typeof healthProfession.publicService === 'object' &&
                healthProfession.publicService.links
        )
        .map((healthProfession) => healthProfession.publicService.links)
        .reduce((accumulator, currentList) => accumulator.concat(currentList));

    // Asynchronously verify url responses for health professions public services
    const otherServicesPromises = allOtherPublicServices.map(
        async (publicService: ILink) => {
            await validateURLResponse(
                publicServicesLinksLogs,
                publicService,
                publicService.link
            );
        }
    );

    await Promise.all(otherServicesPromises);

    process.stdout.write('\r \r');
    console.info('\u2713 Broken links step: Public services');
};

const testCommunitiesLinks = async (healthProfessionCollection: Collection) => {
    // The file in which we want to keep the broken links
    const communitiesLinksLogs = `${linksTestingLogs}/communities_services_links_logs.csv`;

    // All public service objects in the database
    const communitiesRaw = await healthProfessionCollection
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    'communityService.links': 1,
                },
            }
        )
        .toArray();

    // Unwrap communities labels and links
    const allCommunities = communitiesRaw
        .filter(
            (community) =>
                community.communityService && community.communityService.links
        )
        .map((community) => community.communityService.links)
        .reduce((accumulator, currentList) => accumulator.concat(currentList));

    // Remove duplicates
    const communities = [
        ...new Set(allCommunities.map((obj: Service[]) => JSON.stringify(obj))),
    ].map((str) => JSON.parse(str as string));

    // Create the file with the headers adding "errorMessage" and "errorCode" column
    await fs.writeFile(
        communitiesLinksLogs,
        'communityLabel,url,errorMessage,errorCode\n'
    );

    // Asynchronously verify url responses for health professions public services
    const promises = communities.map(async (community) => {
        await validateURLResponse(
            communitiesLinksLogs,
            community,
            community.link
        );
    });

    await Promise.all(promises);
    process.stdout.write('\r \r');
    console.info('\u2713 Broken links step: Communities');
};

/**
 * This is the main function used to find broken links
 * across GoGrow site. It checks links in resources as well
 * as links in FHP pathway.
 * @param pathwayArg states which links should be tested.
 * It is optional so that we can use this function later
 * as part of an API enpoint. Correct values are "resources"
 * and "fhp". It is not case sensitive.
 */

export const exec = async (endpointCall: boolean, pathwayArg?: string) => {
    // Connect to database
    const client = new MongoClient(config.DATABASE_URL);
    await client.connect();

    try {
        if (!client) throw new Error('Database connection error');

        // GrowGo database
        const db = client.db(config.DATABASE_NAME);

        // Reference to the resources collection
        const resourceCollection = db.collection('resources');

        // Reference to the resources collection
        const healthProfessionCollection = db.collection('healthProfessions');

        // Pathway states which links should be tested
        const pathway = pathwayArg
            ? pathwayArg.toLowerCase()
            : process.argv[2]?.toLowerCase();

        // Switch on pathway will default to check all links in the database.
        switch (pathway) {
            case 'resources':
                await testResourcesLinks(resourceCollection);
                break;
            case 'fhp':
                await testPrivateServicesLinks(healthProfessionCollection);
                await testPublicServicesLinks(healthProfessionCollection);
                await testCommunitiesLinks(healthProfessionCollection);
                break;
            case 'privates':
                await testPrivateServicesLinks(healthProfessionCollection);
                break;
            case 'public':
                await testPublicServicesLinks(healthProfessionCollection);
                break;
            case 'communities':
                await testCommunitiesLinks(healthProfessionCollection);
                break;
            default:
                await testResourcesLinks(resourceCollection);
                await testPrivateServicesLinks(healthProfessionCollection);
                await testPublicServicesLinks(healthProfessionCollection);
                await testCommunitiesLinks(healthProfessionCollection);
                break;
        }

        await client.close();

        if (!endpointCall) {
            process.stdout.write('\r \r');
            console.info(
                '✨ Success: please find links testing logs under',
                linksTestingLogs
            );
            process.exit(0);
        } else {
            sendMail(
                'Broken links finder - Result',
                'Broken links finder script execution FINISHED. Access admin panel to download the latest version.'
            );
        }
    } catch (error) {
        await client.close();
        console.error(error.message);

        if (!endpointCall) {
            process.exit(1);
        } else {
            sendMail(
                'Broken links finder - Result',
                'Broken links finder script execution FAILED. Access admin panel to execuite it again.'
            );
        }
    }
};

// The following code implements a spinner
// so the user knows the process keeps going on

// Define the spinner emojis
// const spinner = [
//     '🌑 Loading ...',
//     '🌘 Loading ..',
//     '🌗 Loading .',
//     '🌖 Loading ..',
//     '🌕 Loading ...',
//     '🌔 Loading ..',
//     '🌓 Loading .',
//     '🌒 Loading ..',
// ];
// let currentSpinnerIndex = 0;

// Create an interval to update the spinner every 100 milliseconds
// const intervalId = setInterval(() => {
//     // Move the cursor to the beginning of the line and clear the line
//     process.stdout.write('\r \r');
//     // Write the current spinner emoji
//     process.stdout.write(spinner[currentSpinnerIndex]);
//     // Increment the spinner index and wrap around to 0 if necessary
//     currentSpinnerIndex = (currentSpinnerIndex + 1) % spinner.length;
// }, 100);

// Define an async function to wrap the exec() call and clearInterval()
// async function runScript() {
//     await exec(false);
//     clearInterval(intervalId);
// }

// Call the new async function instead of exec()
// runScript();
