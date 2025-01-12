import { Db } from 'mongodb';
import ResourceController, { IResourceController } from './ResourceController';
import ResourceRepository, { IResourceRepository } from './ResourceRepository';
import { IResourceRouter, ResourceRouter } from './ResourceRouter';
import ResourceService, { IResourceService } from './ResourceService';

export interface IResourceModule {
    resourceService: IResourceService;
    resourceRepository: IResourceRepository;
    resourceController: IResourceController;
    resourceRouter: IResourceRouter;
}

export const ResourceModule = (db: Db): IResourceModule => {
    const resourceCollection = db.collection('resources');

    // Repositories

    const resourceRepository = ResourceRepository(resourceCollection);

    // Services

    const resourceService = ResourceService(resourceRepository);

    // Controller

    const resourceController = ResourceController(resourceService);

    // Router
    const resourceRouter = ResourceRouter(resourceController);

    return {
        resourceService,
        resourceRepository,
        resourceController,
        resourceRouter,
    };
};
