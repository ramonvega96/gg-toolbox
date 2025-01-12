import express from 'express';
import { HttpStatusCode } from '../../util/http/HttpStatusCode';
import { IHealthProfession } from './HealthProfessional';
import { IHealthProfessionService } from './HealthProfessionalService';
import ControllerHelper from '../../helpers/ControllerHelper';

export interface IHealthProfessionController {
    getProfessionInfoByState(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IHealthProfession[] | void>>;
    getProfessionByTag(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<IHealthProfession[] | void>>;
}

export default (
    healthProfessionService: IHealthProfessionService
): IHealthProfessionController => {
    return {
        getProfessionInfoByState: async (req, res) => {
            try {
                const professions =
                    await healthProfessionService.getProfessionInfoByState(
                        req.body.state,
                        req.body.profession
                    );
                if (!professions?.success) throw new Error(professions.message);

                return ControllerHelper.successResponse(
                    res,
                    professions.payload
                );
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        getProfessionByTag: async (req, res) => {
            try {
                const professions =
                    await healthProfessionService.getProfessionByTag(
                        req.body.state,
                        req.body.tag
                    );

                if (!professions?.success) throw new Error(professions.message);

                return ControllerHelper.successResponse(
                    res,
                    professions.payload
                );
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
