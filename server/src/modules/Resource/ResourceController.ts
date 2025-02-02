import express from 'express';
import { HttpStatusCode } from '../../util/http/HttpStatusCode';
import { ExtendedResource } from './Resource';
import { IPaginatedResource } from './PaginatedResource';
import { IResourceService } from './ResourceService';
import ControllerHelper from '../../helpers/ControllerHelper';
import {
    AllFiltersCount,
    CategoryFilter,
    LanguageFilter,
} from './ResourceRepository';
import { JwtCookieHelper } from '../../helpers/JwtCookieHelper';
import config from '../../../config.json';
import { loadResourcesData } from '../../db/generateCSVContent';
import { Resource } from '../../db/util/types/Resource';
import * as fs from 'fs/promises';

export interface IResourceController {
    getResourcesByProperties(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IPaginatedResource | void>>;
    getFilterValues(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<
        express.Response<string[] | CategoryFilter[] | LanguageFilter[] | void>
    >;
    getAllResourcesTags(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<string[] | void>>;
    getGGTResources(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<Resource[] | void>>;
    getUpdatedFilters(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<AllFiltersCount | void>>;
    getResourcesByFuzzy(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<ExtendedResource[] | string | void>>;
    exportResources(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<void>>;
    updateResources(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<Resource[] | void>>;
    confirmResourcesUpdate(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<string[]>>;
    updateResourceUserScore(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<string>>;
    findBrokenLinks(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<void>>;
    getBrokenLinksReport(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<void>>;
}

export default (resourceService: IResourceService): IResourceController => {
    return {
        getResourcesByProperties: async (req, res) => {
            try {
                const resp = await resourceService.getResourcesByProperties(
                    req.body.tags,
                    req.body.page,
                    req.body.sortingCriteria,
                    req.body.pageLimit,
                    req.body.filters
                );

                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getFilterValues: async (req, res) => {
            try {
                const resp = await resourceService.getFilterValues(
                    req.query.filter as string
                );
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getAllResourcesTags: async (req, res) => {
            try {
                const resp = await resourceService.getAllResourcesTags();
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getGGTResources: async (req, res) => {
            try {
                const resp = await resourceService.getGGTResources();
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getUpdatedFilters: async (req, res) => {
            try {
                const { tags, filtersAll, fuzzySearch } = req.body;
                const termsArray = tags.split(' ');
                termsArray.length > 1 && termsArray.push(tags);

                const resp = await resourceService.getUpdatedFilters(
                    termsArray,
                    filtersAll,
                    fuzzySearch
                );

                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getResourcesByFuzzy: async (req, res) => {
            try {
                const {
                    terms,
                    page,
                    limit,
                    filters,
                    sortingCriteria,
                    fetchHidden,
                    state,
                } = req.body;
                const termsArray = terms.split(' ');
                termsArray.length > 1 && termsArray.push(terms);
                const resp = await resourceService.getResourcesByFuzzy(
                    termsArray,
                    page,
                    limit,
                    filters,
                    sortingCriteria,
                    fetchHidden,
                    state
                );
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        exportResources: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (
                    !token ||
                    !(await JwtCookieHelper.validateJwtCookie(token, 'GG'))
                )
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent admin session. Login required'
                    );

                const resp = await resourceService.exportResources();
                if (!resp?.success) throw new Error(resp.message);

                const filePath = './src/db/data/dump-data-files/resources_data.csv';

                res.download(filePath, (err) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                });
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        updateResources: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (
                    !token ||
                    !(await JwtCookieHelper.validateJwtCookie(token, 'GG'))
                )
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent admin session. Login required'
                    );

                if (!req.file)
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.BadRequest_400,
                        'File attachment not found'
                    );

                const resourcesFile = req.file as Express.Multer.File;
                const originalName = resourcesFile.originalname;
                const fileExtension = originalName.split('.').pop();

                if (fileExtension !== 'csv')
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.BadRequest_400,
                        `Expected a csv file. Received a ${fileExtension} instead`
                    );

                const csvFilePath = resourcesFile.path;
                const resourceObjects: Resource[] = [];

                try {
                    await loadResourcesData(csvFilePath, true, resourceObjects);
                } catch (error) {
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.BadRequest_400,
                        error.message
                    );
                }

                const resp =
                    await resourceService.updateResources(resourceObjects);

                if (!resp?.success) throw new Error(resp.message);

                if (resp.payload.length === 0)
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.BadRequest_400,
                        'The file provided contains no data changes. Please review.'
                    );

                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        confirmResourcesUpdate: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (
                    !token ||
                    !(await JwtCookieHelper.validateJwtCookie(token, 'GG'))
                )
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent admin session. Login required'
                    );

                if (!req.body.resources || req.body.resources.length === 0)
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.BadRequest_400,
                        `Empty array - no resources provided`
                    );

                const resp = await resourceService.confirmResourcesUpdate(
                    req.body.resources
                );
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        updateResourceUserScore: async (req, res) => {
            try {
                const resp = await resourceService.updateResourceUserScore(
                    req.body.resourceId,
                    req.body.caseNum
                );
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        findBrokenLinks: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (
                    !token ||
                    !(await JwtCookieHelper.validateJwtCookie(token, 'GG'))
                )
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent admin session. Login required'
                    );

                const resp = await resourceService.findBrokenLinks();
                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getBrokenLinksReport: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (
                    !token ||
                    !(await JwtCookieHelper.validateJwtCookie(token, 'GG'))
                )
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent admin session. Login required'
                    );

                const filePath = './src/db/data/links-testing-logs/resources_links_logs.csv';

                try {
                    await fs.access(filePath);
                } catch (e) {
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.NotFound_404,
                        e.message
                    );
                }

                res.download(filePath, (err) => {
                    if (err) {
                        throw new Error(err.message);
                    }
                });
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
    };
};
