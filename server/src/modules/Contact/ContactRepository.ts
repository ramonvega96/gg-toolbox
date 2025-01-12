import { FailReturn, failure, success } from '../../helpers/Result';
import { SuccessReturn } from '../../helpers/Result';
import { sendMail } from '../../helpers/EmailHelper';
import { ContactForm, ResourceSubmission } from './Contact';
export interface IContactRepository {
    forwardContactMessage(
        contactForm: ContactForm
    ): Promise<SuccessReturn<ContactForm> | FailReturn>;
    forwardResourceSubmission(
        contactForm: ResourceSubmission
    ): Promise<SuccessReturn<ResourceSubmission> | FailReturn>;
}

export default (): IContactRepository => {
    return {
        forwardContactMessage: async (contactForm: ContactForm) => {
            try {
                const htmlMessage = `<div>
                    <p><b>First name:</b> ${contactForm.firstName}</p>
                    <p><b>Last name:</b> ${contactForm.lastName}</p>
                    <p><b>Email address:</b> ${contactForm.emailAddress}</p>
                    <p><b>Subject:</b> ${contactForm.subject}</p>
                    <p><b>Message:</b> ${contactForm.message}</p>
                    <p><b>Date:</b> ${contactForm.timestamp}</p>
                </div>`;

                await sendMail('New message from GrowGo user', htmlMessage);
                return success(contactForm);
            } catch (error) {
                return failure('Unable to process message');
            }
        },
        forwardResourceSubmission: async (
            resourceSubmission: ResourceSubmission
        ) => {
            try {
                const htmlMessage = `<div>
                    <p><b>First name:</b> ${resourceSubmission.firstName}</p>
                    <p><b>Last name:</b> ${resourceSubmission.lastName}</p>
                    <p><b>Email address:</b> ${
                        resourceSubmission.emailAddress
                    }</p>
                    <p><b>Resource title:</b> ${
                        resourceSubmission.resourceTitle
                    }</p>
                    <p><b>Resource:</b> ${
                        typeof resourceSubmission.resource !== 'object'
                            ? resourceSubmission.resource
                            : 'Resource attached.'
                    }</p>
                    <p><b>Date:</b> ${resourceSubmission.timestamp}</p>
                </div>`;

                if (typeof resourceSubmission.resource !== 'object')
                    await sendMail(
                        'New resource submitted by GrowGo user',
                        htmlMessage
                    );
                else {
                    const attachmentFile =
                        resourceSubmission.resource as unknown as Express.Multer.File;
                    await sendMail(
                        'New resource submitted by GrowGo user',
                        htmlMessage,
                        [
                            {
                                filename: attachmentFile.originalname,
                                path: attachmentFile.path,
                            },
                        ]
                    );
                }
                return success(resourceSubmission);
            } catch (error) {
                console.error(error);
                return failure('Unable to process message');
            }
        },
    };
};
