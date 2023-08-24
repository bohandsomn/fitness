import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { TokenService } from '../../token/services/token.service'
import { AuthException } from '../constants/auth.exception'
import { TokenType } from '../../token/constants/token.const'
import { AppRequest } from '../interfaces/app-request.interface'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: AppRequest = context.switchToHttp().getRequest()
        const header = request.headers.authorization
        if (!header) {
            throw new UnauthorizedException(AuthException.HEADER_IS_EMPTY)
        }
        const token = this.tokenService.splitToken({
            header
        })
        const generateTokenDTO = await this.tokenService.verifyToken({
            token,
            type: TokenType.ACCESS
        })
        request.user = generateTokenDTO
        return true
    }
}
