import { Resource } from './types/Resource';
import { checkURLFormat } from './validateLinks';

export const validateResourceId = (resourceId: string | undefined): number => {
    if (resourceId === undefined || !resourceId) {
        throw new Error('resourceId was not provided.');
    }

    const parsedNumber = Number(resourceId.trim());
    if (isNaN(parsedNumber)) {
        throw new Error(`resourceId '${resourceId}' is not a valid number.`);
    }

    return parsedNumber;
};

export const validateResourceTitle = (
    resourceTitle: string | undefined
): string => {
    if (resourceTitle === undefined || !resourceTitle) {
        throw new Error('resourceTitle was not provided.');
    }

    return resourceTitle.trim();
};

export const validateResourceLink = (
    resourceLink: string | undefined
): string => {
    if (resourceLink === undefined || !resourceLink) {
        throw new Error('resourceLink was not provided.');
    }

    const validResourceLink = checkURLFormat(resourceLink.trim());

    if (!validResourceLink) {
        throw new Error('resourceLink is not a valid URL.');
    }

    return resourceLink.trim();
};

export const validateSuite = (suite: string | undefined): string => {
    if (suite === undefined || !suite) {
        throw new Error('suite was not provided.');
    }

    return suite.trim();
};

export const validateSuiteLink = (suiteLink: string | undefined): string => {
    if (suiteLink === undefined || !suiteLink) {
        throw new Error('suiteLink was not provided.');
    }

    const validSuiteLink = checkURLFormat(suiteLink.trim());

    if (!validSuiteLink) {
        throw new Error('suiteLink is not a valid URL.');
    }

    return suiteLink.trim();
};

export const validatePublisher = (publisher: string | undefined): string => {
    if (publisher === undefined || !publisher) {
        throw new Error('publisher was not provided.');
    }

    return publisher.trim();
};

export const validatePublisherLogo = (
    publisherLogo: string | undefined
): string => {
    if (publisherLogo === undefined || !publisherLogo) {
        throw new Error('publisherLogo was not provided.');
    }

    const validPublisherLogo = checkURLFormat(publisherLogo.trim());

    if (!validPublisherLogo) {
        throw new Error('publisherLogo is not a valid URL.');
    }

    if (!publisherLogo.includes('https://stluc.manta.uqcloud.net')) {
        throw new Error('publisherLogo is not in Manta.');
    }

    return publisherLogo.trim();
};

export const validatePublicationDate = (
    publicationDate: string | undefined
): number => {
    if (publicationDate === undefined || !publicationDate) {
        return 0;
    }

    const parsedNumber = Number(publicationDate.trim());
    if (isNaN(parsedNumber)) {
        throw new Error(
            `publicationDate '${publicationDate}' is not a valid number.`
        );
    }

    return parsedNumber;
};

export const validateResourceType = (
    resourceType: string | undefined
): string => {
    if (resourceType === undefined || !resourceType) {
        throw new Error('resourceType was not provided.');
    }

    return resourceType.toLowerCase().trim();
};

export const validateResourceDescription = (
    resourceDescription: string | undefined
): string => {
    if (resourceDescription === undefined || !resourceDescription) {
        throw new Error('resourceDescription was not provided.');
    }

    return resourceDescription.trim();
};

export const validateCategory = (category: string | undefined): string => {
    if (category === undefined || !category) {
        throw new Error('category was not provided.');
    }

    return category.toLowerCase().trim();
};

export const validateSubcategory = (
    subcategory: string | undefined
): string => {
    if (subcategory === undefined || !subcategory) {
        // subcategory is not mandatory
        return '';
    }

    return subcategory.toLowerCase().trim();
};

export const validateAudience = (audience: string | undefined): string => {
    if (audience === undefined || !audience) {
        throw new Error('audience was not provided.');
    }

    return audience.toLowerCase().trim();
};

export const validateAgeGroup = (ageGroup: string | undefined): string => {
    if (ageGroup === undefined || !ageGroup) {
        throw new Error('ageGroup was not provided.');
    }

    return ageGroup.toLowerCase().trim();
};

export const validateTranslatedId = (
    translatedId: string | undefined
): number => {
    if (translatedId === undefined || !translatedId) {
        return 0;
    }

    const parsedNumber = Number(translatedId);
    if (isNaN(parsedNumber)) {
        throw new Error(
            `translatedId '${translatedId}' is not a valid number.`
        );
    }

    return parsedNumber;
};

export const validateTranslatedSubid = (
    translatedId: string | undefined,
    translatedSubid: string | undefined
): string => {
    if (
        (translatedSubid === undefined || !translatedSubid) &&
        validateTranslatedId(translatedId) === 0
    ) {
        return '0';
    }

    if (
        (translatedSubid === undefined || !translatedSubid) &&
        validateTranslatedId(translatedId) !== 0
    ) {
        throw new Error('translatedSubid was not provided.');
    }

    const translatedSubidParts = translatedSubid.trim().split('-');

    const firstPart = Number(translatedSubidParts[0]);
    if (isNaN(firstPart)) {
        throw new Error(
            `translatedSubid format error: '${translatedSubid}' first part ('${translatedSubidParts[0]}') is not a valid number.`
        );
    }
    if (validateTranslatedId(translatedId) !== firstPart) {
        throw new Error(
            `translatedSubid format error - first part ('${firstPart}') should match translatedId ('${validateTranslatedId(
                translatedId
            )}').`
        );
    }
    if (translatedSubidParts.length === 1) {
        return translatedSubid;
    }

    const secondPart = Number(translatedSubidParts[1]);
    if (isNaN(secondPart)) {
        throw new Error(
            `translatedSubid format error: '${translatedSubid}' second part ('${translatedSubidParts[1]}') is not a valid number.`
        );
    }

    return translatedSubid.trim();
};

export const validateLanguage = (language: string | undefined): string => {
    if (language === undefined || !language) {
        throw new Error('language was not provided.');
    }

    return language.toLowerCase().trim();
};

export const validateLanguageDisplay = (
    languageDisplay: string | undefined
): string => {
    if (languageDisplay === undefined || !languageDisplay) {
        throw new Error('languageDisplay was not provided.');
    }

    return languageDisplay.trim();
};

export const validateCulture = (culture: string | undefined): string => {
    if (culture === undefined || !culture) {
        // culture is not mandatory
        return '';
    }

    return culture.toLowerCase().trim();
};

export const validateTags = (tags: string | undefined): string[] => {
    if (!tags) return [];

    return tags
        .split(',')
        .map((s: string) => s.trim().toLowerCase())
        .filter((e: string) => e);
};

export const validateScore = (
    score: string | undefined,
    attribute: string
): number => {
    if (!score) return 0;

    if (isNaN(parseInt(score))) {
        throw new Error(`${attribute} parsed value must be a number.`);
    }

    return parseInt(score);
};

export const validateOriginal = (
    translatedId: string | undefined,
    translatedSubid: string | undefined
): boolean => {
    return (
        validateTranslatedId(translatedId).toString() ===
        validateTranslatedSubid(translatedId, translatedSubid)
    );
};

export const validateHidden = (hidden: string | undefined): boolean => {
    if (hidden && hidden.toLowerCase() === 'true') return true;
    return false;
};

export const validateState = (state: string | undefined): string => {
    const validStates = [
        'nt',
        'wa',
        'qld',
        'sa',
        'nsw',
        'act',
        'vic',
        'tas',
        'national',
    ];

    if (
        state === undefined ||
        !state ||
        !validStates.includes(state.toLowerCase())
    ) {
        // state is not mandatory
        return '';
    }

    return state.toLowerCase();
};

export const validateUniqueResourceIds = (resources: Resource[]) => {
    const seenValues = new Set<number>();

    for (const obj of resources) {
        const value = obj.resourceId;

        if (seenValues.has(value)) {
            throw new Error(`Duplicated resourceId: ${value}`);
        }

        seenValues.add(value);
    }
};

export const validateUniqueVersions = (resources: Resource[]) => {
    const seenValues = new Set();

    for (const obj of resources) {
        const value = JSON.stringify([obj.translatedId, obj.translatedSubid]);

        if (
            seenValues.has(value) &&
            obj.translatedId !== 0 &&
            obj.translatedSubid !== '0'
        ) {
            throw new Error(
                `Duplicated original or translated version resourceId: ${obj.resourceId}`
            );
        }

        seenValues.add(value);
    }
};

export const validateTranslatedSubidsCorrectness = (resources: Resource[]) => {
    const seenValues = new Set<string>();

    for (const obj of resources) {
        const value = obj.translatedSubid;

        if (seenValues.has(value) && value !== '0') {
            throw new Error(
                `Resource ${obj.resourceId} - Duplicated translatedSubid: ${value}`
            );
        }
        if (value === '0' && obj.translatedId !== 0) {
            throw new Error(
                `Resource ${obj.resourceId} - translatedSubid should only be 0 when translatedId is 0: ${value}`
            );
        }
        if (obj.translatedId === 0 && value !== '0') {
            throw new Error(
                `Resource ${obj.resourceId} - translatedSubid should be 0 when translatedId is 0: ${value}`
            );
        }

        seenValues.add(value);
    }
};

export const validateTranslatedVersionsExist = (resources: Resource[]) => {
    for (const obj of resources) {
        if (!obj.original) continue;
        const translatedId = obj.translatedId;
        const translatedSubidPrefix = `${translatedId}-`;

        if (translatedId !== 0 && obj.original) {
            const translatedVersionExist = resources.some((resource) => {
                return (
                    resource.translatedSubid
                        .replace(/^0+/, '')
                        .startsWith(translatedSubidPrefix) && !resource.original
                );
            });

            if (!translatedVersionExist) {
                throw new Error(
                    `No translated versions found for resourceId ${obj.resourceId}`
                );
            }
        }
    }
};

export const validateOriginalVersionExists = (resources: Resource[]) => {
    for (const obj of resources) {
        if (obj.original) continue;

        const translatedId = obj.translatedId;

        const originalVersionExist = resources.some((resource) => {
            return (
                resource.translatedSubid.replace(/^0+/, '') ===
                    translatedId.toString() &&
                resource.original &&
                resource.translatedId === translatedId
            );
        });

        if (!originalVersionExist) {
            throw new Error(
                `No original version found for resourceId ${obj.resourceId}`
            );
        }
    }
};
