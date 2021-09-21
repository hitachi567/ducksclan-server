import { readFile } from 'fs/promises';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '..';
import Log from '../lib/Log';

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

    async sendMail(to: string, subject: Subjects, text: string, html?: string) {
        let info = await this.transporter.sendMail({ from: this.email, to, subject, text, html });
        Log.info("Message sent: %s", info.messageId);
    }

    async sendConfirmMessage(email: string, username: string, code: string | number, deleteLink: string) {
        let text = `Hey, ${username}!\n`
            + 'It looks like you signed up on Ducks clan.\n'
            + `Your code is ${code}.\n`
            + 'If you are not, you can ignore this letter.\nOr you can click on the link '
            + 'to immediately destroy the account associated with this email: ' + deleteLink
            + 'Thanks,\nDuck Clan Support';
        let html = (await readFile('./static/mail/confirm-message.html'))
            .toString()
            .replace(/{{username}}/g, username)
            .replace(/{{code}}/g, code.toString())
            .replace(/{{deleteLink}}/g, deleteLink);
        await this.sendMail(email, Subjects.confirmRegistration, text, html);
    }
}