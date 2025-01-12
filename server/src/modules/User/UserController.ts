import express from 'express';
import { HttpStatusCode } from '../../util/http/HttpStatusCode';
import { User, AuthUser } from './User';
import { IUserService } from './UserService';
import ControllerHelper from '../../helpers/ControllerHelper';
import { JwtCookieHelper } from '../../helpers/JwtCookieHelper';
import config from '../../../config.json';

export interface IUserController {
    userLogin(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response>;
    me(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<AuthUser | void>>;
}

export default (userService: IUserService): IUserController => {
    return {
        userLogin: async (req, res) => {
            try {
                const userEntry: User = req.body;

                if (!userEntry.password || !userEntry.username) {
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.BadRequest_400,
                        'Login failed. Incomplete login form'
                    );
                }

                const resp = await userService.userLogin(userEntry);

                if (!resp.success)
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        resp.message
                    );

                JwtCookieHelper.attachJwtCookieToResponse(
                    res,
                    { ...resp.payload },
                    config.ADMIN_ACCESS_COOKIE_NAME,
                    config.JWT_EXPIRATION_TIME,
                    config.NODE_ENV === 'production'
                );
                return ControllerHelper.successResponse(res);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        me: async (req, res) => {
            try {
                const token = req.cookies.ADMIN_ACCESS;

                if (!token)
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'No token provided. Login required'
                    );

                const resp = await userService.me(token, req.body.project);

                if (!resp.success)
                    return ControllerHelper.failResponse(
                        res,
                        HttpStatusCode.Unauthorized_401,
                        'Expired or inexistent session. Login required'
                    );

                return ControllerHelper.successResponse(res);
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
