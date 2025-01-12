import { Db } from 'mongodb';
import AnalyticsRepository, {
    IAnalyticsRepository,
} from './AnalyticsRepository';
import AnalyticsService, { IAnalyticsService } from './AnalyticsService';
import AnalyticsController, {
    IAnalyticsController,
} from './AnalyticsController';
import { IAnalyticsRouter, AnalyticsRouter } from './AnalyticsRouter';

export interface IAnalyticsModule {
    analyticsService: IAnalyticsService;
    analyticsRepository: IAnalyticsRepository;
    analyticsController: IAnalyticsController;
    analyticsRouter: IAnalyticsRouter;
}

export const AnalyticsModule = (db: Db): IAnalyticsModule => {
    const analyticsCollection = db.collection('analytics');

    // Repositories
    const analyticsRepository = AnalyticsRepository(analyticsCollection);

    // Services
    const analyticsService = AnalyticsService(analyticsRepository);

    // Controller
    const analyticsController = AnalyticsController(analyticsService);

    // Router
    const analyticsRouter = AnalyticsRouter(analyticsController);

    return {
        analyticsService,
        analyticsRepository,
        analyticsController,
        analyticsRouter,
    };
};
