import { FailReturn, failure, success } from '../../helpers/Result';
import { SuccessReturn } from '../../helpers/Result';
import { User, AuthUser } from './User';
import { Collection } from 'mongodb';
import bcrypt from 'bcrypt';
import { JwtCookieHelper } from '../../helpers/JwtCookieHelper';

export interface IUserRepository {
    userLogin(loginForm: User): Promise<SuccessReturn<AuthUser> | FailReturn>;
    me(
        token: string,
        project: string
    ): Promise<SuccessReturn<void> | FailReturn>;
}

export default (userCollection: Collection): IUserRepository => {
    return {
        userLogin: async (loginForm: User) => {
            try {
                const existingUser = await userCollection.findOne({
                    username: loginForm.username,
                    project: loginForm.project,
                });

                if (
                    !existingUser ||
                    !(await bcrypt.compare(
                        loginForm.password,
                        existingUser.password
                    ))
                ) {
                    return failure(
                        'Login failed. Please review account details'
                    );
                }

                const resp: AuthUser = {
                    username: existingUser.username,
                    userId: existingUser._id.toString(),
                };
                return success(resp);
            } catch {
                throw new Error(
                    'Error: Something went wrong while fetching user data.'
                );
            }
        },
        me: async (token: string, project: string) => {
            const validToken = await JwtCookieHelper.validateJwtCookie(
                token,
                project
            );
            if (validToken) return success();
            return failure();
        },
    };
};
