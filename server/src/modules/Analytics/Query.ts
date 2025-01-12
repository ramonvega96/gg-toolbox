import { Sort } from 'mongodb';
import { SearchBarFilters } from '../Resource/Resource';

export interface IQuery {
    input: string;
    tags: string[];
    page: number;
    sortingCriteria: Sort;
    resourceCount: number;
    timestamp: Date;
    filters?: SearchBarFilters;
}
