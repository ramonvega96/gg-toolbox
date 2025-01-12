import { IContainer } from '../Container';
import express from 'express';
import { success } from '../helpers/Result';

/**
 * Creates a new express router.
 * Bootstraps the express router using the root routers provided by the module container.
 * Return the new router.
 * @param container Services module container
 */
export const ApplicationRouter = (container: IContainer) => {
    // Create new router
    const router = express.Router();

    router.use('/resource', container.resourceModule.resourceRouter);
    router.use(
        '/healthProfession',
        container.healthProfessionalModule.healthProfessionalRouter
    );
    router.use('/analytics', container.analyticsModule.analyticsRouter);
    router.use('/contact', container.contactModule.contactRouter);
    router.use('/user', container.userModule.userRouter);

    router.get('/_health', (_req, res) => {
        return res.sendStatus(200);
    });

    return success(router);
};
