import { Db } from 'mongodb';
import UserRepository, { IUserRepository } from './UserRepository';
import UserService, { IUserService } from './UserService';
import UserController, { IUserController } from './UserController';
import { IUserRouter, UserRouter } from './UserRouter';

export interface IUserModule {
    userService: IUserService;
    userRepository: IUserRepository;
    userController: IUserController;
    userRouter: IUserRouter;
}

export const UserModule = (db: Db): IUserModule => {
    const userCollection = db.collection('user');

    // Repositories
    const userRepository = UserRepository(userCollection);

    // Services
    const userService = UserService(userRepository);

    // Controller
    const userController = UserController(userService);

    // Router
    const userRouter = UserRouter(userController);

    return {
        userService,
        userRepository,
        userController,
        userRouter,
    };
};
