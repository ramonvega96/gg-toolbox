import { MailOptions } from 'nodemailer/lib/smtp-pool';
import * as nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

export async function sendMail(
    emailSubject: string,
    emailContent: string,
    attachments?: Attachment[]
) {
    const transporter = nodemailer.createTransport({
        host: 'mailhub.eait.uq.edu.au',
        port: 25,
        secure: false,
    });

    const mailOptions: MailOptions = {
        to: ['nutritionforchildren@uq.edu.au', 'r.vega@uq.edu.au'],
        subject: emailSubject,
        html: emailContent,
        attachments: attachments,
    };

    if (attachments && attachments.length === 0) delete mailOptions.attachments;

    const info = await transporter.sendMail(mailOptions);

    if (info) {
        console.info('Message sent: %s', info);
    }

    return;
}
