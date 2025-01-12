import { ExtendedResource } from './Resource';

export interface IPaginatedResource {
    resources: ExtendedResource[];
    totalCount: number;
    first: number;
    limit: number;
    queryMatch: boolean;
}
