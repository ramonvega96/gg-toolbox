import pino from 'pino';

import { RequestHandler } from 'express';

const logger = pino();

export function apiLogger(): RequestHandler {
    return (req, _res, next) => {
        logger
            ? logger.info(
                  {
                      path: req.path,
                      ip: req.ip,
                      method: req.method,
                      hostname: req.hostname,
                      params: req.params,
                      query: req.query,
                      // User object extracted from JWT/cookie etc.
                      user: {},
                  },
                  'Request'
              )
            : '';
        return next();
    };
}

export default logger;
