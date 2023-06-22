import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import * as path from 'path';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRootAsync({
          useFactory: async (config: ConfigService) => ({
            transport: {
              host: config.get('MAIL_HOST'),
              secure: false,
              auth: {
                user: config.get('SMTP_USERNAME'),
                pass: config.get('SMTP_PASSWORD'),
              },
              port: config.get('SMTP_PORT'),
              tls: {
                rejectUnauthorized: false
              },
            },
            defaults: {
              from: `"Fitness" <${config.get('SMTP_USERNAME')}>`,
            },
            template: {
              dir: path.join(__dirname, '..', 'templates'),
              adapter: new EjsAdapter(),
              options: {
                strict: false,
              },
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [MailService],
      exports: [MailService],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
