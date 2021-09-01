import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export enum Subjects {
    confirmRegistration =  'Confirmation of registration',
    changePassword = 'Change password'
};

export default class MailService {
    protected transporter: Transporter<SMTPTransport.SentMessageInfo>;
    private email: string = 'ducks.clan.app@gmail.com';
    private password: string = 'Qtr`CNSb"9QK6K2T';

    constructor() {
        this.transporter = createTransport({
            service: 'gmail',
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