import express from 'express';
import { IHealthProfessionController } from './HealthProfessionalController';

export type IHealthProfessionRouter = express.Router;

export const HealthProfessionalRouter = (
    healthProfessionalController: IHealthProfessionController
): express.Router => {
    const router = express.Router();

    router.post(
        '/state',
        healthProfessionalController.getProfessionInfoByState
    );

    router.post('/tag', healthProfessionalController.getProfessionByTag);

    return router;
};
