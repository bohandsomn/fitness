import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Observable, map } from 'rxjs'
import { Response } from 'express'
import { UserTokensDTO } from '../dto/user-tokens.dto.js'
import { UserTokenDTO } from '../dto/user-token.dto.js'
import { Environment } from '../../common/constants/environment.js'

@Injectable()
export class SaveTokeninterceptor implements NestInterceptor<UserTokensDTO, UserTokenDTO> {
    constructor(
        private readonly configService: ConfigService,
    ) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler<UserTokensDTO>
    ): Observable<UserTokenDTO> {
        const response: Response = context.switchToHttp().getResponse()
        return next
            .handle()
            .pipe(
                map(({
                    user,
                    tokens: {
                        accessToken,
                        refreshToken
                    }
                }) => {
                    const cookieRefreshTokenMaxAge = this.configService.getOrThrow(Environment.COOKIE_REFRESH_TOKEN_MAX_AGE)
                    const maxAge = parseInt(cookieRefreshTokenMaxAge)
                    response.cookie(
                        'token',
                        refreshToken,
                        {
                            maxAge,
                            httpOnly: true
                        }
                    )
                    return {
                        user,
                        accessToken,
                    }
                })
            )
    }
}
