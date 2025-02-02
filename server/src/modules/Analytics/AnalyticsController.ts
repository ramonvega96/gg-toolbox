import express from 'express';
import { HttpStatusCode } from '../../util/http/HttpStatusCode';
import { IQuery } from './Query';
import { IAnalyticsService } from './AnalyticsService';
import ControllerHelper from '../../helpers/ControllerHelper';
import { JwtCookieHelper } from '../../helpers/JwtCookieHelper';
import config from '../../../config.json';

export interface IAnalyticsController {
    createQueryRecord(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IQuery | void>>;
    getAllQueries(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IQuery[] | void>>;
    updatePageScore(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IQuery[] | void>>;
    createLRSTinyBitesRecord(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IQuery[] | void>>;
    exportTBAnalitycs(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<void>>;
    runGGAnalitycs(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<void>>;
}

export default (analyticsService: IAnalyticsService): IAnalyticsController => {
    return {
        createQueryRecord: async (req, res) => {
            try {
                const resp = await analyticsService.createQueryRecord(
                    req.body.input,
                    req.body.tags,
                    req.body.page,
                    req.body.sortingCriteria,
                    req.body.resourceCount,
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
        getAllQueries: async (req, res) => {
            try {
                const resp = await analyticsService.getAllQueries();
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
        updatePageScore: async (req, res) => {
            try {
                const resp = await analyticsService.updatePageScore(
                    req.body.pageId,
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
        createLRSTinyBitesRecord: async (req, res) => {
            try {
                const resp = await analyticsService.createLRSTinyBitesRecord(
                    req.body
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
        exportTBAnalitycs: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (
                    !token ||
                    !(await JwtCookieHelper.validateJwtCookie(token, 'TB'))
                )
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent admin session. Login required'
                    );

                const resp = await analyticsService.exportTBAnalitycs();
                if (!resp?.success) throw new Error(resp.message);

                const filePath = './src/db/data/dump-data-files/analitycs_data_tb.csv';

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
        runGGAnalitycs: async (req, res) => {
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

                const resp = await analyticsService.runGGAnalitycs();
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
    };
};
