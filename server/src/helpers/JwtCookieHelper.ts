import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config.json';
import { MongoClient, ObjectId } from 'mongodb';

export const JwtCookieHelper = {
    attachJwtCookieToResponse: (
        res: Response,
        data: Record<string, unknown>,
        cookieName: string,
        expirationSeconds: number,
        secure = true
    ): Response => {
        const token = jwt.sign(data, config.JWT_SECRET, {
            expiresIn: (expirationSeconds || 14400) * 1000,
        });

        return res.cookie(cookieName, token, {
            expires: new Date(Date.now() + expirationSeconds * 1000),
            // set to true if your using https
            secure,
            sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: config.NODE_ENV === 'production',
        });
    },
    removeJwtCookieFromResponse: (res: Response, cookieName: string) => {
        return res.clearCookie(cookieName);
    },
    validateJwtCookie: async (token: string, project: string) => {
        const client = new MongoClient(config.DATABASE_URL);

        try {
            await client.connect();
            if (!client) throw new Error();

            const isTest = process.argv.indexOf('--forceExit') !== -1;
            const db = client.db(
                isTest ? config.DATABASE_TEST_NAME : config.DATABASE_NAME
            );
            const userCollection = db.collection('user');
            const decodedToken = jwt.verify(token, config.JWT_SECRET);

            const existingUser = await userCollection.findOne({
                _id: new ObjectId((decodedToken as JwtPayload).userId),
                username: (decodedToken as JwtPayload).username,
                project: project,
            });

            await client.close();

            if (!existingUser) return false;

            return true;
        } catch (e) {
            await client.close();
            const jwtErrors = [
                'TokenExpiredError',
                'JsonWebTokenError',
                'NotBeforeError',
            ];

            if (jwtErrors.includes(e.name)) return false;

            throw new Error(
                'Error: Something went wrong while verifying token'
            );
        }
    },
};
