import { FailReturn, SuccessReturn } from '../../helpers/Result';
import { IQuery } from './Query';
import { IAnalyticsRepository, LRSTBAnalitycsObj } from './AnalyticsRepository';
import { SearchBarFilters } from '../Resource/Resource';
import { Sort } from 'mongodb';

export interface IAnalyticsService {
    createQueryRecord(
        input: string,
        tags: string[],
        page: number,
        sortingCriteria: Sort,
        resourceCount: number,
        filters?: SearchBarFilters
    ): Promise<SuccessReturn<IQuery> | FailReturn>;
    getAllQueries(): Promise<SuccessReturn<IQuery[]> | FailReturn>;
    updatePageScore(
        pageId: string,
        caseNumber: number
    ): Promise<SuccessReturn<void> | FailReturn>;
    createLRSTinyBitesRecord(
        analitycsObj: LRSTBAnalitycsObj
    ): Promise<SuccessReturn<void> | FailReturn>;
    exportTBAnalitycs(): Promise<SuccessReturn<void> | FailReturn>;
    runGGAnalitycs(): Promise<SuccessReturn<void> | FailReturn>;
}

export default (
    analyticsRepository: IAnalyticsRepository
): IAnalyticsService => {
    return {
        createQueryRecord: async (
            input: string,
            tags: string[],
            page: number,
            sortingCriteria: Sort,
            resourceCount: number,
            filters?: SearchBarFilters
        ) =>
            await analyticsRepository.createQueryRecord(
                input,
                tags,
                page,
                sortingCriteria,
                resourceCount,
                filters
            ),
        getAllQueries: async () => await analyticsRepository.getAllQueries(),
        updatePageScore: async (pageId: string, caseNum: number) =>
            await analyticsRepository.updatePageScore(pageId, caseNum),
        createLRSTinyBitesRecord: async (analitycsObj: LRSTBAnalitycsObj) =>
            await analyticsRepository.createLRSTinyBitesRecord(analitycsObj),
        exportTBAnalitycs: async () => {
            return await analyticsRepository.exportTBAnalitycs();
        },
        runGGAnalitycs: async () => {
            return await analyticsRepository.runGGAnalitycs();
        },
    };
};
