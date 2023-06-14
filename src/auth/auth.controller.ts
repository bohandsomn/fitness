import { Body, Controller, Post, Get, UseGuards, Put, Param, Res, HttpStatus, UseInterceptors } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { IAuthController } from './auth-controller.interface'
import { AuthService } from './auth.service'
import { RegisterUserDTO } from './dto/register-user.dto'
import { UserTokensDTO } from './dto/user-tokens.dto'
import { LogInUserDTO } from './dto/log-in-user.dto'
import { AutoLogInUserDTO } from './dto/auto-log-in-user.dto'
import { AuthGuard } from './auth.guard'
import { Cookies } from './cookies.decorator'
import { SaveTokenInterceptor } from './save-token.interceptor'
import { EmailConfirmationInterceptor } from './email-confirmation.interceptor'
import { CreateUserPipe } from '../user/create-user.pipe'
import { User } from '../user/user.decorator'
import { AppValidationPipe } from '../app-validation.pipe'
import { ClearTokenInterceptor } from './clear-token.interceptor'

@Controller('auth')
export class AuthController implements IAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    @Post('/register')
    @UseInterceptors(EmailConfirmationInterceptor, SaveTokenInterceptor)
    async registerUser(
        @Body(AppValidationPipe, CreateUserPipe) dto: RegisterUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.registerUser(dto)
    }

    @Post('/log-in')
    @UseInterceptors(SaveTokenInterceptor)
    async logInUser(
        @Body(AppValidationPipe) dto: LogInUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.logInUser(dto)
    }

    @Get('/auto-log-in')
    @UseInterceptors(SaveTokenInterceptor)
    @UseGuards(AuthGuard)
    async autoLogInUser(
        @User() dto: AutoLogInUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.autoLogInUser(dto)
    }

    @Put('/refresh')
    @UseInterceptors(SaveTokenInterceptor)
    async refreshToken(
        @Cookies('token') refreshToken: string
    ): Promise<UserTokensDTO> {
        return this.authService.refreshToken({ refreshToken })
    }

    @Get('/log-out')
    @UseInterceptors(ClearTokenInterceptor)
    async logOutUser(
        @Cookies('token') refreshToken: string
    ): Promise<void> {
        return this.authService.logOutUser({ refreshToken })
    }

    @Get('/activate/:link')
    async activateUser(
        @Param('link') link: string,
        @Res() response: Response
    ): Promise<void> {
        await this.authService.activateUser({ link })
        return response
            .status(HttpStatus.MOVED_PERMANENTLY)
            .redirect(this.configService.getOrThrow('CLIENT_LINK'))
    }
}
