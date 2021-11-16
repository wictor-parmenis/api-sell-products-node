import nodemailer from 'nodemailer';
import { IParseMailTemplate } from './HandlebarsMailTemplate';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import fs from 'fs';

export interface IMailContact {
  name: string;
  email: string;
}
export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  templateData: IParseMailTemplate;
  subject: string;
}

export default class EtherealMail {
  static async sendMail({
    to,
    subject,
    templateData,
    from,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transported = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const message = await transported.sendMail({
      from: {
        address: from?.email || 'equipe@vendas.com',
        name: from?.name || 'Equipe de vendas',
      },
      to: {
        address: to.email,
        name: to.name,
      },
      subject: subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
