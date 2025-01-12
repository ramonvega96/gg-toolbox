import { FailReturn, SuccessReturn, success } from '../../helpers/Result';
import {
    IFuseSort,
    ResourceUpdateCasesEnum,
    UpdatedResource,
} from './Resource';
import { IPaginatedResource } from './PaginatedResource';
import {
    IResourceRepository,
    AllFiltersCount,
    CategoryFilter,
    LanguageFilter,
} from './ResourceRepository';
import { Sort } from 'mongodb';
import { SearchBarFilters } from './Resource';
import { Resource } from '../../db/util/types/Resource';
import { validateResourcesDataIntegrity } from '../../db/generateCSVContent';

export const getAddedResources = (
    incomingResources: Resource[],
    existingResources: Resource[]
): Resource[] => {
    const newResourceObjects = incomingResources.filter(
        (incomingResource) =>
            !existingResources.some(
                (existingResource) =>
                    existingResource.resourceId === incomingResource.resourceId
            )
    );
    return newResourceObjects;
};

export const getDeletedResources = (
    incomingResources: Resource[],
    existingResources: Resource[]
): Resource[] => {
    const removedResourceObjects = existingResources.filter(
        (existingResource) =>
            !incomingResources.some(
                (incomingResource) =>
                    incomingResource.resourceId === existingResource.resourceId
            )
    );
    return removedResourceObjects;
};

export const classifyAddedResources = (
    addedResources: Resource[],
    incomingResources: Resource[]
): UpdatedResource[] => {
    const caseAResources = (
        addedResources.filter(
            (resource) => resource.original
        ) as UpdatedResource[]
    ).map((resource) => {
        resource.case = ResourceUpdateCasesEnum.caseA;
        return resource;
    });

    const caseBResources = (
        addedResources.filter(
            (resource) =>
                !resource.original &&
                addedResources.some((addedResource) => {
                    return (
                        resource.translatedSubid
                            .replace(/^0+/, '')
                            .startsWith(addedResource.translatedSubid) &&
                        addedResource.translatedId === resource.translatedId &&
                        addedResource.original
                    );
                })
        ) as UpdatedResource[]
    ).map((resource) => {
        resource.case = ResourceUpdateCasesEnum.caseB;
        return resource;
    });

    const caseCResources = (
        addedResources.filter(
            (resource) =>
                !resource.original &&
                !addedResources.some((existingResource) => {
                    return (
                        resource.translatedSubid
                            .replace(/^0+/, '')
                            .startsWith(existingResource.translatedSubid) &&
                        existingResource.translatedId ===
                            resource.translatedId &&
                        existingResource.original
                    );
                }) &&
                incomingResources.some((existingResource) => {
                    return (
                        resource.translatedSubid
                            .replace(/^0+/, '')
                            .startsWith(existingResource.translatedSubid) &&
                        existingResource.translatedId ===
                            resource.translatedId &&
                        existingResource.original
                    );
                })
        ) as UpdatedResource[]
    ).map((resource) => {
        resource.case = ResourceUpdateCasesEnum.caseC;
        return resource;
    });

    return [...caseAResources, ...caseBResources, ...caseCResources];
};

export const classifyDeletedResources = (
    deletedResources: Resource[]
): UpdatedResource[] => {
    const caseDResources = (
        deletedResources.filter(
            (resource) => !resource.original
        ) as UpdatedResource[]
    ).map((resource) => {
        resource.case = ResourceUpdateCasesEnum.caseD;
        return resource;
    });

    const caseEResources = (
        deletedResources.filter(
            (resource) => resource.original
        ) as UpdatedResource[]
    ).map((resource) => {
        resource.case = ResourceUpdateCasesEnum.caseE;
        return resource;
    });

    return [...caseDResources, ...caseEResources];
};

export const applyDataUpdate = (
    existingResources: Resource[],
    changedResources: UpdatedResource[]
): Resource[] => {
    const addCases = ['a', 'b', 'c'];
    const deleteCases = ['d', 'e'];
    let result = [...existingResources];

    for (const resource of changedResources) {
        if (deleteCases.includes(resource.case.caseId)) {
            result = result.filter(
                (res) => res.resourceId !== resource.resourceId
            );
        } else if (addCases.includes(resource.case.caseId)) {
            result.push(resource);
        }
    }

    return result;
};

export interface IResourceService {
    getResourcesByProperties(
        tags: string[],
        page: number,
        sortingCriteria: Sort,
        pageLimit?: number,
        filters?: SearchBarFilters
    ): Promise<SuccessReturn<IPaginatedResource> | FailReturn>;
    getFilterValues(
        filter: string
    ): Promise<
        | SuccessReturn<string[]>
        | SuccessReturn<CategoryFilter[]>
        | SuccessReturn<LanguageFilter[]>
        | FailReturn
    >;
    getAllResourcesTags(): Promise<SuccessReturn<string[]> | FailReturn>;
    getGGTResources(): Promise<SuccessReturn<Resource[]> | FailReturn>;
    getUpdatedFilters(
        tags: string[],
        filtersAll: SearchBarFilters,
        fuzzySearch: boolean
    ): Promise<SuccessReturn<AllFiltersCount> | FailReturn>;
    getResourcesByFuzzy(
        tags: string[],
        page: number,
        limit: number,
        filters?: SearchBarFilters,
        sortingCriteria?: IFuseSort,
        fetchHidden?: boolean,
        state?: string
    ): Promise<SuccessReturn<IPaginatedResource> | FailReturn>;
    exportResources(): Promise<SuccessReturn<void> | FailReturn>;
    updateResources(
        incomingResources: Resource[]
    ): Promise<SuccessReturn<UpdatedResource[]> | FailReturn>;
    confirmResourcesUpdate(
        incomingResources: UpdatedResource[]
    ): Promise<SuccessReturn<string[]> | FailReturn>;
    updateResourceUserScore(
        resourceId: number,
        caseNumber: number
    ): Promise<SuccessReturn<void> | FailReturn>;
    findBrokenLinks(): Promise<SuccessReturn<void> | FailReturn>;
}

export default (resourceRepository: IResourceRepository): IResourceService => {
    return {
        getResourcesByProperties: async (
            tags: string[],
            page: number,
            sortingCriteria: Sort,
            pageLimit?: number,
            filters?: SearchBarFilters
        ) =>
            await resourceRepository.getResourcesByProperties(
                tags,
                page,
                sortingCriteria,
                pageLimit,
                filters
            ),
        getFilterValues: async (filter: string) =>
            await resourceRepository.getFilterValues(filter),
        getAllResourcesTags: async () =>
            await resourceRepository.getAllResourcesTags(),
        getGGTResources: async () => await resourceRepository.getGGTResources(),
        getUpdatedFilters: async (
            tags: string[],
            filtersAll: SearchBarFilters,
            fuzzySearch: boolean
        ) =>
            await resourceRepository.getUpdatedFilters(
                tags,
                filtersAll,
                fuzzySearch
            ),
        getResourcesByFuzzy: async (
            tags: string[],
            page: number,
            limit: number,
            filters?: SearchBarFilters,
            sortingCriteria?: IFuseSort,
            fetchHidden?: boolean,
            state?: string
        ) => {
            return await resourceRepository.getResourcesByFuzzy(
                tags,
                page,
                limit,
                filters,
                sortingCriteria,
                fetchHidden,
                state
            );
        },
        exportResources: async () => {
            return await resourceRepository.exportResources();
        },
        updateResources: async (incomingResources: Resource[]) => {
            const existingResources =
                await resourceRepository.getExistingResources();
            if (!existingResources.payload)
                return existingResources as unknown as Promise<FailReturn>;

            const addedResources = getAddedResources(
                incomingResources,
                existingResources.payload
            );

            const deletedResources = getDeletedResources(
                incomingResources,
                existingResources.payload
            );

            const deletedResourcesClassyfied =
                classifyDeletedResources(deletedResources);

            const addedResourcesClassyfied = classifyAddedResources(
                addedResources,
                incomingResources
            );

            const updatedResources = [
                ...addedResourcesClassyfied,
                ...deletedResourcesClassyfied,
            ];

            return success(updatedResources);
        },
        confirmResourcesUpdate: async (updatedResources: UpdatedResource[]) => {
            const existingResources =
                await resourceRepository.getExistingResources();

            if (!existingResources.payload)
                return existingResources as unknown as Promise<FailReturn>;

            const expectedResult = applyDataUpdate(
                existingResources.payload,
                updatedResources
            );
            validateResourcesDataIntegrity(expectedResult);

            return await resourceRepository.applyUpdateRequest(
                updatedResources
            );
        },
        updateResourceUserScore: async (
            resourceId: number,
            caseNum: number
        ) => {
            return await resourceRepository.updateResourceUserScore(
                resourceId,
                caseNum
            );
        },
        findBrokenLinks: async () => {
            return await resourceRepository.findBrokenLinks();
        },
    };
};
