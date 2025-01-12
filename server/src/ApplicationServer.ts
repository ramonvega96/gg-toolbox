import express from 'express';
import cors from 'cors';
import logger from './util/logger';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { ConfigType } from './config/config.schema';
import { IContainer } from './Container';
import { ApplicationRouter } from './router/index';
import { failure, success } from './helpers/Result';

export const ApplicationServer = (
    config: ConfigType,
    container: IContainer
) => {
    const app = expressApp(config);

    const router = ApplicationRouter(container);

    if (!router.success) return failure(router.message);

    app.use(router.payload);

    return success({
        app,
        start: () => {
            return app.listen(config.PORT, () => {
                logger.info(
                    `Node.js + Express server started at ${config.PORT}`
                );
            });
        },
    });
};

/**
 * Returns a new configured express app
 * @param config
 */
export function expressApp(
    config: ConfigType
    ) {
    // Application
    const app = express();

    app.use(helmet());

    app.use(
        cors({
            credentials: true,
            origin: [config.CLIENT_ORIGIN, /\.uqcloud\.net$/],
        })
    );

    app.use(cookieParser());

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    // parse application/json
    app.use(express.json({ limit: '25mb' }));

    return app;
}
