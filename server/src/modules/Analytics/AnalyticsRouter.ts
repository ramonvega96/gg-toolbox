import express from 'express';
import { IAnalyticsController } from './AnalyticsController';

export type IAnalyticsRouter = express.Router;

export const AnalyticsRouter = (
    analyticsController: IAnalyticsController
): express.Router => {
    const router = express.Router();

    router.get('/all', analyticsController.getAllQueries);
    router.post('/', analyticsController.createQueryRecord);
    router.post('/pageScore', analyticsController.updatePageScore);
    router.post(
        '/lrsTbAnalitycs',
        analyticsController.createLRSTinyBitesRecord
    );
    router.get('/exportTB', analyticsController.exportTBAnalitycs);
    router.get('/runGG', analyticsController.runGGAnalitycs);

    return router;
};
