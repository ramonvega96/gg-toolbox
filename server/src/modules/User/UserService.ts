import { FailReturn, SuccessReturn } from '../../helpers/Result';
import { User, AuthUser } from './User';
import { IUserRepository } from './UserRepository';

export interface IUserService {
    userLogin(loginForm: User): Promise<SuccessReturn<AuthUser> | FailReturn>;
    me(
        token: string,
        project: string
    ): Promise<SuccessReturn<void> | FailReturn>;
}

export default (userRepository: IUserRepository): IUserService => {
    return {
        userLogin: async (loginForm: User) => {
            const resp = await userRepository.userLogin(loginForm);
            return resp;
        },
        me: async (token: string, project: string) => {
            const resp = await userRepository.me(token, project);
            return resp;
        },
    };
};
