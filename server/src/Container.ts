import { ConfigType } from './config/config.schema';
import { FailReturn, failure, success, SuccessReturn } from './helpers/Result';
import { MongoClient } from 'mongodb';
import { IResourceModule, ResourceModule } from './modules/Resource';
import {
    IHealthProfessionalModule,
    HealthProfessionalModule,
} from './modules/HealthProfessional';
import { IAnalyticsModule, AnalyticsModule } from './modules/Analytics';
import { IContactModule, ContactModule } from './modules/Contact';
import { IUserModule, UserModule } from './modules/User';

export interface IContainer {
    resourceModule: IResourceModule;
    healthProfessionalModule: IHealthProfessionalModule;
    analyticsModule: IAnalyticsModule;
    contactModule: IContactModule;
    userModule: IUserModule;
}

/**
 * Bootstraps database connection, repositories, services, controllers and routers in the application
 */

export const Container = async (
    config: ConfigType
): Promise<SuccessReturn<IContainer> | FailReturn> => {
    // Mongo data connection here.
    const client = new MongoClient(config.DATABASE_URL);

    await client.connect();

    if (!client) return failure('Database connection error');

    const db = client.db(config.DATABASE_NAME);

    const resourceModule = ResourceModule(db);
    const healthProfessionalModule = HealthProfessionalModule(db);
    const analyticsModule = AnalyticsModule(db);
    const contactModule = ContactModule();
    const userModule = UserModule(db);

    return success({
        resourceModule,
        healthProfessionalModule,
        analyticsModule,
        contactModule,
        userModule,
    });
};
