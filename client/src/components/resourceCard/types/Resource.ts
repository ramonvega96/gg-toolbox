export interface UpdatedResource extends Resource {
    case: ResourceUpdateCase;
}

export interface ResourceUpdateCase {
    caseOverview: string;
    caseDetail: string;
    caseId: string;
}

export interface Resource {
    resourceId: number;
    resourceTitle: string;
    resourceLink: string;
    suite: string;
    suiteLink: string;
    publisher: string;
    publisherLogo: string;
    publicationDate: number;
    resourceType: string;
    resourceDescription: string;
    category: string;
    subcategory: string;
    audience: string;
    ageGroup: string;
    translatedId: number;
    translatedSubid: string;
    language: string;
    languageDisplay: string;
    culture: string;
    tags: string[];
    score: number;
    original: boolean;
    translatedVersions: TranslatedVersion[];
}

export interface TranslatedVersion {
    resourceLink: string;
    resourceDescription: string;
    language: string;
}
