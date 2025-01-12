import { sendMail } from '../helpers/EmailHelper';
import ContactRepository, {
    IContactRepository,
} from '../modules/Contact/ContactRepository';
import { ContactForm, ResourceSubmission } from '../modules/Contact/Contact';

const contactUsReqBody: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    subject: string;
    message: string;
} = {
    firstName: 'Test',
    lastName: 'User',
    emailAddress: 't.user@uq.edu.au',
    subject: 'Resource Question',
    message: 'Hey, this is a test message.',
};

const urlResourceSubmissionReqBody: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    resourceTitle: string;
    resource: string;
} = {
    firstName: 'Test',
    lastName: 'User',
    emailAddress: 't.user@uq.edu.au',
    resourceTitle: 'Resource Title',
    resource: 'https://resource-test.com',
};

const fileResourceSubmissionReqBody = {
    firstName: 'Test',
    lastName: 'User',
    emailAddress: 't.user@uq.edu.au',
    resourceTitle: 'Resource Title',
    resource: {
        fieldname: 'resource',
        originalname: 'sample.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: '/tmp',
        filename: 'd8df84eea1c725ea666272fbdbf2ca49',
        path: '/tmp/d8df84eea1c725ea666272fbdbf2ca49',
        size: 49474,
    } as Express.Multer.File,
};

jest.mock('../helpers/EmailHelper');

describe('ContactRepository test', () => {
    let contactRepository: IContactRepository;

    beforeAll(() => {
        contactRepository = ContactRepository();
    });

    it('should forward contact message', async () => {
        const contactForm: ContactForm = {
            firstName: contactUsReqBody.firstName,
            lastName: contactUsReqBody.lastName,
            emailAddress: contactUsReqBody.emailAddress,
            subject: contactUsReqBody.subject,
            message: contactUsReqBody.message,
            timestamp: new Date(
                new Date().toLocaleString('en-US', {
                    timeZone: 'Australia/Brisbane',
                })
            ),
        };

        const htmlMessage = `<div>
                    <p><b>First name:</b> ${contactForm.firstName}</p>
                    <p><b>Last name:</b> ${contactForm.lastName}</p>
                    <p><b>Email address:</b> ${contactForm.emailAddress}</p>
                    <p><b>Subject:</b> ${contactForm.subject}</p>
                    <p><b>Message:</b> ${contactForm.message}</p>
                    <p><b>Date:</b> ${contactForm.timestamp}</p>
                </div>`;

        const result =
            await contactRepository.forwardContactMessage(contactForm);

        expect(sendMail).toHaveBeenCalledWith(
            'New message from GrowGo user',
            htmlMessage
        );

        expect(result.success).toBe(true);
        expect(result.payload).toEqual({
            firstName: 'Test',
            lastName: 'User',
            emailAddress: 't.user@uq.edu.au',
            subject: 'Resource Question',
            message: 'Hey, this is a test message.',
            timestamp: contactForm.timestamp,
        });
    });

    it('should forward upload resource form submission - URL', async () => {
        const resourceSubmission: ResourceSubmission = {
            firstName: urlResourceSubmissionReqBody.firstName,
            lastName: urlResourceSubmissionReqBody.lastName,
            emailAddress: urlResourceSubmissionReqBody.emailAddress,
            resourceTitle: urlResourceSubmissionReqBody.resourceTitle,
            resource: urlResourceSubmissionReqBody.resource,
            timestamp: new Date(
                new Date().toLocaleString('en-US', {
                    timeZone: 'Australia/Brisbane',
                })
            ),
        };

        const htmlMessage = `<div>
                    <p><b>First name:</b> ${resourceSubmission.firstName}</p>
                    <p><b>Last name:</b> ${resourceSubmission.lastName}</p>
                    <p><b>Email address:</b> ${resourceSubmission.emailAddress}</p>
                    <p><b>Resource title:</b> ${resourceSubmission.resourceTitle}</p>
                    <p><b>Resource:</b> ${resourceSubmission.resource}</p>
                    <p><b>Date:</b> ${resourceSubmission.timestamp}</p>
                </div>`;

        const result =
            await contactRepository.forwardResourceSubmission(
                resourceSubmission
            );

        expect(sendMail).toHaveBeenCalledWith(
            'New resource submitted by GrowGo user',
            htmlMessage
        );

        expect(result.success).toBe(true);
        expect(result.payload).toEqual({
            firstName: 'Test',
            lastName: 'User',
            emailAddress: 't.user@uq.edu.au',
            resourceTitle: 'Resource Title',
            resource: 'https://resource-test.com',
            timestamp: resourceSubmission.timestamp,
        });
    });

    it('should forward upload resource form submission - File', async () => {
        const resourceSubmission: ResourceSubmission = {
            firstName: fileResourceSubmissionReqBody.firstName,
            lastName: fileResourceSubmissionReqBody.lastName,
            emailAddress: fileResourceSubmissionReqBody.emailAddress,
            resourceTitle: fileResourceSubmissionReqBody.resourceTitle,
            resource: fileResourceSubmissionReqBody.resource,
            timestamp: new Date(
                new Date().toLocaleString('en-US', {
                    timeZone: 'Australia/Brisbane',
                })
            ),
        };

        const htmlMessage = `<div>
                    <p><b>First name:</b> ${resourceSubmission.firstName}</p>
                    <p><b>Last name:</b> ${resourceSubmission.lastName}</p>
                    <p><b>Email address:</b> ${resourceSubmission.emailAddress}</p>
                    <p><b>Resource title:</b> ${resourceSubmission.resourceTitle}</p>
                    <p><b>Resource:</b> Resource attached.</p>
                    <p><b>Date:</b> ${resourceSubmission.timestamp}</p>
                </div>`;

        const result =
            await contactRepository.forwardResourceSubmission(
                resourceSubmission
            );

        expect(sendMail).toHaveBeenCalledWith(
            'New resource submitted by GrowGo user',
            htmlMessage,
            [
                {
                    filename:
                        fileResourceSubmissionReqBody.resource.originalname,
                    path: fileResourceSubmissionReqBody.resource.path,
                },
            ]
        );

        expect(result.success).toBe(true);
        expect(result.payload).toEqual({
            firstName: 'Test',
            lastName: 'User',
            emailAddress: 't.user@uq.edu.au',
            resourceTitle: 'Resource Title',
            resource: resourceSubmission.resource,
            timestamp: resourceSubmission.timestamp,
        });
    });
});
