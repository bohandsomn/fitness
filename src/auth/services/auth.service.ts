import { Injectable, ForbiddenException } from '@nestjs/common'
import { IAuthService } from '../interfaces/auth-service.interface.js'
import { RegisterUserDTO } from '../dto/register-user.dto.js'
import { UserTokensDTO } from '../dto/user-tokens.dto.js'
import { LogInUserDTO } from '../dto/log-in-user.dto.js'
import { AutoLogInUserDTO } from '../dto/auto-log-in-user.dto.js'
import { LogOutUserDTO } from '../dto/log-out-user.dto.js'
import { CommonService } from '../../common/services/common.service.js'
import { UserService } from '../../user/services/user.service.js'
import { TokenService } from '../../token/services/token.service.js'
import { RefreshTokenDTO } from '../../token/dto/refresh-token.dto.js'
import { TokenType } from '../../token/constants/token.const.js'
import { ActivateUserDTO } from '../../user/dto/activate-user.dto.js'
import { AuthException } from '../constants/auth.exception.js'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly commonService: CommonService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) { }

    async registerUser(dto: RegisterUserDTO): Promise<UserTokensDTO> {
        const link = this.commonService.generateUniqueString()
        const MOCK_REFRESH_TOKEN = ''
        const user = await this.userService.createUser({
            link,
            refreshToken: MOCK_REFRESH_TOKEN,
            ...dto
        })
        const tokens = this.tokenService.generateTokens({
            userId: user.id,
            isActive: user.isActive,
            role: user.role,
        })
        await this.tokenService.saveToken({
            userId: user.id,
            refreshToken: tokens.refreshToken,
        })
        const userPayload = await this.userService.adaptUser(user)
        return {
            tokens,
            user: userPayload
        }
    }

    async logInUser(dto: LogInUserDTO): Promise<UserTokensDTO> {
        const user = await this.userService.getUser(dto)
        await this.userService.checkPassword({
            userId: user.id,
            password: dto.password
        })
        const tokens = this.tokenService.generateTokens({
            userId: user.id,
            isActive: user.isActive,
            role: user.role,
        })
        await this.tokenService.saveToken({
            userId: user.id,
            refreshToken: tokens.refreshToken,
        })
        const userPayload = await this.userService.adaptUser(user)
        return {
            tokens,
            user: userPayload
        }
    }

    async autoLogInUser(dto: AutoLogInUserDTO): Promise<UserTokensDTO> {
        const user = await this.userService.getUser({ id: dto.userId })
        const tokens = this.tokenService.generateTokens({
            userId: user.id,
            isActive: user.isActive,
            role: user.role,
        })
        await this.tokenService.saveToken({
            userId: user.id,
            refreshToken: tokens.refreshToken,
        })
        const userPayload = await this.userService.adaptUser(user)
        return {
            tokens,
            user: userPayload
        }
    }

    async refreshToken(dto: RefreshTokenDTO): Promise<UserTokensDTO> {
        const generateTokenDTO = await this.tokenService.verifyToken({
            token: dto.refreshToken,
            type: TokenType.REFRESH
        })
        const user = await this.userService.getUser({
            id: generateTokenDTO.userId
        })
        const userPayload = await this.userService.adaptUser(user)
        const tokens = await this.tokenService.refreshToken(dto)
        return {
            tokens,
            user: userPayload
        }
    }

    async logOutUser(dto: LogOutUserDTO): Promise<void> {
        await this.tokenService.deleteToken(dto)
    }

    async activateUser(dto: ActivateUserDTO): Promise<void> {
        await this.userService.activateUser(dto)
    }
}
