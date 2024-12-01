import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { emailAuth } from 'src/config/email';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: emailAuth,
    });
  }
  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: emailAuth.user,
      },
      to,
      subject,
      html,
    });
  }
}
