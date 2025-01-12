import { FailReturn, failure, success } from '../../helpers/Result';
import { SuccessReturn } from '../../helpers/Result';
import { Collection, Sort } from 'mongodb';
import { IQuery } from './Query';
import { SearchBarFilters } from '../Resource/Resource';
import { runGGAnalitycs, exportTBAnalitycs } from '../../db/util/fromDBtoCSV';

export interface LRSTBAnalitycsObj {
    user: string;
    sessionId: string;
    location: string;
    duration: number;
    date: string;
    time: string;
}

export interface IAnalyticsRepository {
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

export default (analyticsCollection: Collection): IAnalyticsRepository => {
    /**
     * Analytics collection stores all analytics relevant data for GrowGo and TinyBites
     * projects. In order to make a difference between the analytics document types, refer
     * to the guide below:
     * Type 0: These documents describe queries that were executed from the searchbar against the
     * database. Refer to IQuery interface.
     * Type 1: These documents describe likes/dislikes on GrowGo pages.
     * Type 2: These documents describe users bahaviours in Tiny Bites Lumpy Road To Solids
     */
    return {
        createQueryRecord: async (
            input: string,
            tags: string[],
            page: number,
            sortingCriteria: Sort,
            resourceCount: number,
            filters?: SearchBarFilters
        ) => {
            const query = {
                type: 0,
                input: input,
                tags: tags,
                page: page,
                sortingCriteria: sortingCriteria,
                filters: filters ? filters : undefined,
                resourceCount: resourceCount,
                timestamp: new Date(
                    new Date().toLocaleString('en-US', {
                        timeZone: 'Australia/Brisbane',
                    })
                ),
            };

            await analyticsCollection.insertOne(query);

            return success(query);
        },
        getAllQueries: async () => {
            const queries = await analyticsCollection.find().toArray();
            if (!queries) return failure('Cannot find queries');
            return success(queries as unknown as IQuery[]);
        },
        updatePageScore: async (pageId: string, caseNum: number) => {
            /**
             * Case 0: From neutral to like: +1 userScore & +1 likesCount
             * Case 1: From neutral to dislike: -1 userScore & +1 dislikesCount
             * Case 2: From like to neutral: -1 userScore & -1 likesCount
             * Case 3: From like to dislike: -2 userScore, -1 likesCount & +1 dislikesCount
             * Case 4: From dislike to neutral: +1 userScore, -1 dislikesCount
             * Case 5: From dislike to like: +2 userScore, -1 dislikesCount & +1 likesCount
             */

            const isValidCase = (num: number) => num >= 0 && num <= 5;

            try {
                const incrementValues = [
                    // Case 0
                    { userScore: 1, likesCount: 1, dislikesCount: 0 },
                    // Case 1
                    { userScore: -1, likesCount: 0, dislikesCount: 1 },
                    // Case 2
                    { userScore: -1, likesCount: -1, dislikesCount: 0 },
                    // Case 3
                    { userScore: -2, likesCount: -1, dislikesCount: 1 },
                    // Case 4
                    { userScore: 1, likesCount: 0, dislikesCount: -1 },
                    // Case 5
                    { userScore: 2, likesCount: 1, dislikesCount: -1 },
                ];

                if (isValidCase(caseNum)) {
                    analyticsCollection.updateOne(
                        { pageId: pageId, type: 1 },
                        {
                            $inc: {
                                userScore: incrementValues[caseNum].userScore,
                                likesCount: incrementValues[caseNum].likesCount,
                                dislikesCount:
                                    incrementValues[caseNum].dislikesCount,
                            },
                        },
                        { upsert: true }
                    );
                } else {
                    throw new Error('Invalid score option.');
                }

                return success();
            } catch (error) {
                return failure(error.message);
            }
        },
        createLRSTinyBitesRecord: async (analitycsObj: LRSTBAnalitycsObj) => {
            try {
                await analyticsCollection.insertOne({
                    type: 2,
                    ...analitycsObj,
                });
                return success();
            } catch (error) {
                return failure(error.message);
            }
        },
        exportTBAnalitycs: async () => {
            try {
                await exportTBAnalitycs();
            } catch (error) {
                return failure(error.message);
            }
            return success();
        },
        runGGAnalitycs: async () => {
            runGGAnalitycs();
            return success();
        },
    };
};
