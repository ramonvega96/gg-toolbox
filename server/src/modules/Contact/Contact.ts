export interface ContactForm {
    firstName: string;
    lastName: string;
    emailAddress: string;
    subject: string;
    message: string;
    timestamp: Date;
}

export interface ResourceSubmission {
    firstName: string;
    lastName: string;
    emailAddress: string;
    resourceTitle: string;
    resource: string | Express.Multer.File;
    timestamp: Date;
}
