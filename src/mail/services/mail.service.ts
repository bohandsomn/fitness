import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { EmailConfirmationDTO } from '../dto/email-confirmation.dto.js'
import { AuthConst } from '../../auth/constants/auth.cont.js'

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async emailConfirmation(dto: EmailConfirmationDTO): Promise<void> {
        return this.mailerService.sendMail({
            to: dto.email,
            subject: AuthConst.EMAIL_CONFIRMATION_SUBJECT,
            template: './email-confirmation',
            context: {
                link: dto.link,
            },
        })
    }
}
