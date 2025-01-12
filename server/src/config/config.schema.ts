export type ConfigType = {
    NODE_ENV: string;
    DATABASE_URL: string;
    DATABASE_NAME: string;
    DATABASE_TEST_NAME: string;
    PORT: number;
    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: number;
    ADMIN_ACCESS_COOKIE_NAME: string;
};
