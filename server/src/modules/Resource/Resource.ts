import { Resource } from '../../db/util/types/Resource';

export interface ExtendedResource extends Resource {
    translatedVersions: TranslatedVersion[];
}

export interface TranslatedVersion {
    resourceLink: string;
    resourceDescription: string;
    language: string;
}

export interface SearchBarFilters {
    resourceTypes: string[];
    ageGroups: string[];
    languages: string[];
    categories: string[];
    subcategories: string[];
    audiences: string[];
    cultures: string[];
}

export type IFuseSort = {
    [key in 'publicationDate' | 'resourceTitle' | 'score']: number;
};

export interface UpdatedResource extends Resource {
    case: ResourceUpdateCase;
}

export interface ResourceUpdateCase {
    caseOverview: string;
    caseDetail: string;
    caseId: string;
}

export const ResourceUpdateCasesEnum = {
    caseA: {
        caseOverview: 'Add resource',
        caseDetail: 'The following original resource will be added.',
        caseId: 'a',
    } as ResourceUpdateCase,
    caseB: {
        caseOverview: 'Add resource',
        caseDetail:
            'The following translated version of an original resource being added along, will be added.',
        caseId: 'b',
    } as ResourceUpdateCase,
    caseC: {
        caseOverview: 'Add resource',
        caseDetail:
            'The following translated version of an existing original resource, will be added.',
        caseId: 'c',
    } as ResourceUpdateCase,
    caseD: {
        caseOverview: 'Delete resource',
        caseDetail:
            'The following translated version of an original resource, will be deleted.',
        caseId: 'd',
    } as ResourceUpdateCase,
    caseE: {
        caseOverview: 'Delete resource',
        caseDetail: 'The following original resource will be deleted.',
        caseId: 'e',
    } as ResourceUpdateCase,
};
