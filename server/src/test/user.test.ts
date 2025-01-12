import express from 'express';
import UserRepository, {
    IUserRepository,
} from '../modules/User/UserRepository';
import UserService, { IUserService } from '../modules/User/UserService';
import UserController, {
    IUserController,
} from '../modules/User/UserController';
import { AuthUser, User } from '../modules/User/User';
import { Db, Collection } from 'mongodb';
import { client, testUserGG, testUserTB } from '../../test/setupFile';
import config from '../../config.json';
import jwt, { JwtPayload } from 'jsonwebtoken';

describe('UserRepository and UserController test', () => {
    let userRepository: IUserRepository;
    let userService: IUserService;
    let userController: IUserController;
    let userCollection: Collection;
    let db: Db;

    beforeAll(() => {
        db = client.db(config.DATABASE_TEST_NAME);
        userCollection = db.collection('user');
        userRepository = UserRepository(userCollection);
        userService = UserService(userRepository);
        userController = UserController(userService);
    });

    it('should login when account exists and password is correct', async () => {
        const userInDb = await userCollection.findOne({
            username: testUserGG.username,
        });
        const result = await userRepository.userLogin(testUserGG);

        expect(result.success).toBe(true);
        expect((result.payload as AuthUser).userId).toBe(
            userInDb?._id.toString()
        );
        expect((result.payload as AuthUser).username).toBe(
            (userInDb as unknown as User).username
        );
    });

    it('should fail login when username does not exist', async () => {
        const loginForm: User = {
            username: 'badUser',
            password: testUserGG.password,
            project: 'GG',
        };

        const result = await userRepository.userLogin(loginForm);
        expect(result.success).toBe(false);
        expect(result.message).toBe(
            'Login failed. Please review account details'
        );
    });

    it('should fail login when password is incorrect', async () => {
        const loginForm: User = {
            username: testUserGG.username,
            password: 'badPassword',
            project: 'GG',
        };

        const result = await userRepository.userLogin(loginForm);
        expect(result.success).toBe(false);
        expect(result.message).toBe(
            'Login failed. Please review account details'
        );
    });

    it('should return a successful login response with a cookie for GG user', async () => {
        const mockRequest = {
            body: testUserGG,
        } as unknown as express.Request;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockRequest, mockResponse);
        expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
        expect(mockResponse.cookie).toHaveBeenCalledWith(
            'ADMIN_ACCESS',
            expect.anything(),
            expect.anything()
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
        });

        const token = (mockResponse.cookie as jest.Mock).mock.calls[0][1];
        const userInDb = await userCollection.findOne({
            username: testUserTB.username,
            project: testUserGG.project,
        });

        const decodedToken = jwt.verify(token, config.JWT_SECRET);

        expect((decodedToken as JwtPayload).username).toBe(testUserGG.username);
        expect((decodedToken as JwtPayload).userId).toBe(
            userInDb?._id.toString()
        );
    });

    it('should return a successful login response with a cookie for TB user', async () => {
        const mockRequest = {
            body: testUserTB,
        } as unknown as express.Request;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockRequest, mockResponse);
        expect(mockResponse.cookie).toHaveBeenCalledTimes(1);
        expect(mockResponse.cookie).toHaveBeenCalledWith(
            'ADMIN_ACCESS',
            expect.anything(),
            expect.anything()
        );
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
        });

        const token = (mockResponse.cookie as jest.Mock).mock.calls[0][1];
        const userInDb = await userCollection.findOne({
            username: testUserTB.username,
            project: testUserTB.project,
        });

        const decodedToken = jwt.verify(token, config.JWT_SECRET);

        expect((decodedToken as JwtPayload).username).toBe(testUserTB.username);
        expect((decodedToken as JwtPayload).userId).toBe(
            userInDb?._id.toString()
        );
    });

    it('should return an unsuccessful login response without a cookie', async () => {
        const loginForm: User = {
            username: 'wrongUsername',
            password: 'wrongPwd',
            project: 'GG',
        };

        const mockRequest = {
            body: loginForm,
        } as unknown as express.Request;

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockRequest, mockResponse);
        expect(mockResponse.cookie).toHaveBeenCalledTimes(0);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Login failed. Please review account details',
        });
    });

    it('should successfuly verify cookie jwt', async () => {
        const mockLoginRequest = {
            body: testUserGG,
        } as unknown as express.Request;

        const mockLoginResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockLoginRequest, mockLoginResponse);
        const token = (mockLoginResponse.cookie as jest.Mock).mock.calls[0][1];

        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: token,
            },
            body: {
                project: 'GG',
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await userController.me(mockUserRequest, mockUserResponse);

        expect(mockUserResponse.status).toHaveBeenCalledWith(200);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: true,
        });
    });

    it('should fail to verify cookie jwt whith wrong project', async () => {
        const mockLoginRequest = {
            body: testUserGG,
        } as unknown as express.Request;

        const mockLoginResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn(),
        } as unknown as express.Response;

        await userController.userLogin(mockLoginRequest, mockLoginResponse);
        const token = (mockLoginResponse.cookie as jest.Mock).mock.calls[0][1];

        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: token,
            },
            body: {
                project: 'TB',
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await userController.me(mockUserRequest, mockUserResponse);

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent session. Login required',
        });
    });

    it('should fail to verify cookie jwt when not provided', async () => {
        const mockUserRequest = {
            cookies: {},
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await userController.me(mockUserRequest, mockUserResponse);

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'No token provided. Login required',
        });
    });

    it('should fail to verify cookie jwt when broken token', async () => {
        const mockUserRequest = {
            cookies: {
                ADMIN_ACCESS: 'notARealToken-djfghksjdgf',
            },
            body: {
                project: 'GG',
            },
        } as unknown as express.Request;

        const mockUserResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as express.Response;

        await userController.me(mockUserRequest, mockUserResponse);

        expect(mockUserResponse.status).toHaveBeenCalledWith(401);
        expect(mockUserResponse.json).toHaveBeenCalledWith({
            success: false,
            message: 'Expired or inexistent session. Login required',
        });
    });
});
