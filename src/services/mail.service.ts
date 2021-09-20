import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '..';

export enum Subjects {
    confirmRegistration = 'Confirmation of registration',
    changePassword = 'Change password'
};

export default class MailService {
    protected transporter: Transporter<SMTPTransport.SentMessageInfo>;
    private service: string = config.nodeMail.service;
    private email: string = config.nodeMail.email;
    private password: string = config.nodeMail.password;

    constructor() {
        this.transporter = createTransport({
            service: this.service,
            auth: {
                user: this.email,
                pass: this.password
            }
        });
    }

    async sendMail(to: string, subject: Subjects) {
        let info = await this.transporter.sendMail({
            from: 'Ducks clan' + this.email,
            to,
            subject,
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        console.log("Message sent: %s", info.messageId);
    }
}