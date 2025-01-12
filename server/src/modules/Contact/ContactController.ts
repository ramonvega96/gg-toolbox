import express from 'express';
import { HttpStatusCode } from '../../util/http/HttpStatusCode';
import { ContactForm, ResourceSubmission } from './Contact';
import { IContactService } from './ContactService';
import ControllerHelper from '../../helpers/ControllerHelper';

export interface IContactController {
    forwardContactMessage(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<ContactForm | void>>;
    forwardResourceSubmission(
        req: express.Request,
        res: express.Response,
        next?: express.NextFunction
    ): Promise<express.Response<ResourceSubmission | void>>;
}

export default (contactService: IContactService): IContactController => {
    return {
        forwardContactMessage: async (req, res) => {
            try {
                const contactEntry: ContactForm = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailAddress: req.body.emailAddress,
                    subject: req.body.subject,
                    message: req.body.message,
                    timestamp: new Date(
                        new Date().toLocaleString('en-US', {
                            timeZone: 'Australia/Brisbane',
                        })
                    ),
                };

                for (const key in contactEntry) {
                    if (contactEntry[key as keyof ContactForm] === undefined) {
                        throw new Error(
                            `Unsuccesful submission: Form field missing - ${key}`
                        );
                    }
                }

                const resp =
                    await contactService.forwardContactMessage(contactEntry);

                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
        forwardResourceSubmission: async (req, res) => {
            try {
                const submissionEntry: ResourceSubmission = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailAddress: req.body.emailAddress,
                    resourceTitle: req.body.resourceTitle,
                    resource: req.file ? req.file : req.body.resource,
                    timestamp: new Date(
                        new Date().toLocaleString('en-US', {
                            timeZone: 'Australia/Brisbane',
                        })
                    ),
                };

                for (const key in submissionEntry) {
                    if (
                        submissionEntry[key as keyof ResourceSubmission] ===
                        undefined
                    ) {
                        throw new Error(
                            `Unsuccesful submission: Form field missing - ${key}`
                        );
                    }
                }

                const resp =
                    await contactService.forwardResourceSubmission(
                        submissionEntry
                    );

                if (!resp?.success) throw new Error(resp.message);
                return ControllerHelper.successResponse(res, resp.payload);
            } catch (e) {
                return ControllerHelper.failResponse(
                    res,
                    HttpStatusCode.InternalServerError_500,
                    e.message
                );
            }
        },
    };
};
