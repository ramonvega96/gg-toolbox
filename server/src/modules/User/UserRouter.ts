import express from 'express';
import { IUserController } from './UserController';

export type IUserRouter = express.Router;

export const UserRouter = (userController: IUserController): express.Router => {
    const router = express.Router();
    router.post('/login', userController.userLogin);
    router.post('/', userController.me);
    return router;
};
