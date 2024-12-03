import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { emailAuth } from 'src/config/email';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: this.configService.get('nodemailer_host'),
      port: this.configService.get('nodemailer_port'),
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
