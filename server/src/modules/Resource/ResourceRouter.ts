import express from 'express';
import { IResourceController } from './ResourceController';
import multer, { Multer } from 'multer';
import os from 'os';

export type IResourceRouter = express.Router;

export const ResourceRouter = (
    resourceController: IResourceController
): express.Router => {
    const router = express.Router();
    const upload: Multer = multer({ dest: os.tmpdir() });

    router.post('/', resourceController.getResourcesByProperties);
    router.get('/uniqueFilterValues', resourceController.getFilterValues);
    router.get('/tags', resourceController.getAllResourcesTags);
    router.get('/ggtResources', resourceController.getGGTResources);
    router.post('/updatedFilters', resourceController.getUpdatedFilters);
    router.post('/searchbarQuery', resourceController.getResourcesByFuzzy);
    router.get('/export', resourceController.exportResources);
    router.post(
        '/updateResources',
        upload.single('resourcesData'),
        resourceController.updateResources
    );
    router.post(
        '/confirmResourcesUpdate',
        resourceController.confirmResourcesUpdate
    );
    router.post('/userScore', resourceController.updateResourceUserScore);
    router.get('/runBrokenLinksFinder', resourceController.findBrokenLinks);
    router.get('/brokenLinksReport', resourceController.getBrokenLinksReport);

    return router;
};
