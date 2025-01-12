import { Db, Collection, Sort, ObjectId } from 'mongodb';
import { client } from '../../test/setupFile';
import AnalyticsRepository, {
    IAnalyticsRepository,
} from '../modules/Analytics/AnalyticsRepository';
import { SearchBarFilters } from '../modules/Resource/Resource';
import config from '../../config.json';

const reqBody: {
    input: string;
    tags: string[];
    page: number;
    sortingCriteria: Sort;
    resourceCount: number;
    filters: SearchBarFilters;
} = {
    input: 'test',
    tags: ['test', 'test2'],
    page: 1,
    sortingCriteria: {},
    resourceCount: 12,
    filters: {
        resourceTypes: ['test'],
        ageGroups: ['test'],
        languages: [],
        categories: ['test'],
        subcategories: [],
        audiences: [],
        cultures: [],
    },
};

describe('AnalyticsRepository', () => {
    let db: Db;
    let analyticsCollection: Collection;
    let analyticsRepository: IAnalyticsRepository;

    beforeAll(() => {
        db = client.db(config.DATABASE_TEST_NAME);
        analyticsCollection = db.collection('analytics');
        analyticsRepository = AnalyticsRepository(analyticsCollection);
    });

    it('should create a query record', async () => {
        const result = await analyticsRepository.createQueryRecord(
            reqBody.input,
            reqBody.tags,
            reqBody.page,
            reqBody.sortingCriteria,
            reqBody.resourceCount,
            reqBody.filters
        );

        expect(result.success).toBe(true);

        expect(result.payload).toEqual({
            input: 'test',
            tags: ['test', 'test2'],
            page: 1,
            sortingCriteria: {},
            resourceCount: 12,
            filters: {
                resourceTypes: ['test'],
                ageGroups: ['test'],
                languages: [],
                categories: ['test'],
                subcategories: [],
                audiences: [],
                cultures: [],
            },
            timestamp: expect.any(Date),
            type: 0,
            _id: expect.any(ObjectId),
        });
    });
});
