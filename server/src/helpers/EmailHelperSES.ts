import { SESClient, SendEmailCommand, SendRawEmailCommand } from '@aws-sdk/client-ses';
import fs from 'fs';

export interface Attachment {
    filename: string,
    path: string,
}

const sesClient = new SESClient({
    region: 'ap-southeast-2',
});

export async function sendSESMail(
    emailSubject: string,
    emailContent: string,
) {
    const params = {
        Destination: {
            ToAddresses: ['growandgotoolbox@hotmail.com'],
        },
        Message: {
            Body: {
                Html: {
                    Data: emailContent,
                },
            },
            Subject: {
                Data: emailSubject,
            },
        },
        Source: 'no-reply@growandgotoolbox.org',
    };

    const command = new SendEmailCommand(params);

    // Send the email using SES
    const data = await sesClient.send(command);
    console.log('Email sent! Message ID: ', data.MessageId);
}

export async function sendSESMailAttachment(
    emailSubject: string,
    emailContent: string,
    files?: Attachment[]
) {
    try {
        const boundary = `----Boundary-${Date.now()}`;

        // Construct the email headers
        let rawEmail = `From: no-reply@growandgotoolbox.org\n`;
        rawEmail += `To: growandgotoolbox@hotmail.com\n`;
        rawEmail += `Subject: ${emailSubject}\n`;
        rawEmail += `MIME-Version: 1.0\n`;
        rawEmail += `Content-Type: multipart/mixed; boundary="${boundary}"\n\n`;

        // Add the email body
        rawEmail += `--${boundary}\n`;
        rawEmail += `Content-Type: text/html; charset=UTF-8\n\n`;
        rawEmail += `${emailContent}\n\n`;

        // Add attachments (if any)
        if (files) {
            for (const file of files) {
                const fileContent = fs.readFileSync(file.path).toString('base64');
                rawEmail += `--${boundary}\n`;
                rawEmail += `Content-Type: application/pdf; name="${file.filename}"\n`;
                rawEmail += `Content-Disposition: attachment; filename="${file.filename}"\n`;
                rawEmail += `Content-Transfer-Encoding: base64\n\n`;
                rawEmail += `${fileContent}\n\n`;
            }
        }

        // End the MIME message
        rawEmail += `--${boundary}--`;

        // Create the command
        const params = {
            RawMessage: {
                Data: Buffer.from(rawEmail), // SES expects the email as a buffer
            },
        };

        const command = new SendRawEmailCommand(params);

        // Send the email
        const data = await sesClient.send(command);
        console.log('Email sent! Message ID:', data.MessageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
