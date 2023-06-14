import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Observable, map } from 'rxjs'
import { UserTokenDTO } from './dto/user-token.dto'
import { MailService } from '../mail/mail.service'
import { UserService } from '../user/user.service'

@Injectable()
export class EmailConfirmationInterceptor implements NestInterceptor<UserTokenDTO, Promise<UserTokenDTO>> {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler<UserTokenDTO>): Observable<Promise<UserTokenDTO>> {
        return next
            .handle()
            .pipe(
                map(async (userToken) => {
                    const user = await this.userService.getUser({
                        email: userToken.user.email
                    })
                    const serverUrl = this.configService.getOrThrow('SERVER_URL')
                    const link = `${serverUrl}/auth/activate/${user.link}`
                    const email = user.email
                    this.mailService.emailConfirmation({
                        email,
                        link,
                    })
                    return userToken
                })
            )
    }
}
