import express from 'express';
import { IContactController } from './ContactController';
import multer, { Multer } from 'multer';
import os from 'os';

export type IContactRouter = express.Router;

export const ContactRouter = (
    contactController: IContactController
): express.Router => {
    const router = express.Router();
    const upload: Multer = multer({ dest: os.tmpdir() });

    router.post('/contactUs', contactController.forwardContactMessage);
    router.post(
        '/submitResource',
        upload.single('resource'),
        contactController.forwardResourceSubmission
    );

    return router;
};
