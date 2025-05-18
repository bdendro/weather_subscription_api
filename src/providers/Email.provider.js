import nodemailer from 'nodemailer';
import ENV from '../config/env.js';
import Logger from '../utils/logger/Logger.js';
import EMAIL from '../constants/email.js';
import {
  confirmationSuccessTemplate,
  confirmEmailTemplate,
  unsubscribeSuccessTemplate,
  weatherReportTemplate,
} from '../utils/emailTemplates.js';

const logger = new Logger();

class EmailProvider {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.EMAIL_HOST,
      port: ENV.EMAIL_PORT,
      secure: ENV.EMAIL_SECURE,
      auth: {
        user: ENV.EMAIL,
        pass: ENV.EMAIL_PASSWORD,
      },
    });
    this.transporter
      .verify()
      .then(() => {
        logger.info('SMTP connection successful. Email transporter is ready.');
      })
      .catch((err) => {
        logger.error({
          err,
          msg: 'SMTP connection failed. Please check email configuration.',
        });
      });
  }

  async _sendMail({ to, subject, text, html }) {
    try {
      return await this.transporter.sendMail({
        from: `Weather App ${ENV.EMAIL}`,
        to,
        subject,
        text,
        html,
      });
    } catch (err) {
      logger.error({ err, msg: `while trying to send email to ${to}` });
    }
  }

  async sendConfirmationMail(to, token) {
    const confirmationUrl = `${EMAIL.CONFIRMATION_BASE_URL}/${token}`;
    const html = confirmEmailTemplate(confirmationUrl);
    await this._sendMail({
      to,
      subject: EMAIL.SUBJECT_CONFIRMATION,
      html,
    });
  }

  async sendWeatherMail(
    to,
    { temperature, humidity, description },
    token,
    city
  ) {
    const unsubsribeUrl = `${EMAIL.UNSUBSCRIBE_BASE_URL}/${token}`;
    const html = weatherReportTemplate(
      { temperature, humidity, description },
      unsubsribeUrl,
      city
    );
    await this._sendMail({ to, subject: EMAIL.SUBJECT_WEATHER, html });
  }

  async sendConfirmedMail(to, token) {
    const unsubsribeUrl = `${EMAIL.UNSUBSCRIBE_BASE_URL}/${token}`;
    const html = confirmationSuccessTemplate(unsubsribeUrl);
    await this._sendMail({
      to,
      subject: EMAIL.SUBJECT_CONFIRMED,
      html,
    });
  }

  async sendUnsubscribedMail(to) {
    const html = unsubscribeSuccessTemplate();
    await this._sendMail({
      to,
      subject: EMAIL.SUBJECT_CANCELED,
      html,
    });
  }
}

export default new EmailProvider();
