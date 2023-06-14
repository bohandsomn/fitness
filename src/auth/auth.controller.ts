import { Body, Controller, Post, Get, UseGuards, Put, Param, Res, HttpStatus, UseInterceptors } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiCookieAuth, ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
import { UserTokenDTO } from './dto/user-token.dto'
import { ValidationErrorResponseDTO } from '../error/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from '../error/exception-error-response.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @Post('/register')
    @UseInterceptors(EmailConfirmationInterceptor, SaveTokenInterceptor)
    async registerUser(
        @Body(AppValidationPipe, CreateUserPipe) dto: RegisterUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.registerUser(dto)
    }

    @ApiOperation({ summary: 'User log-in' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @Post('/log-in')
    @UseInterceptors(SaveTokenInterceptor)
    async logInUser(
        @Body(AppValidationPipe) dto: LogInUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.logInUser(dto)
    }

    @ApiOperation({ summary: 'User auto-log-in' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @Get('/auto-log-in')
    @UseInterceptors(SaveTokenInterceptor)
    @UseGuards(AuthGuard)
    async autoLogInUser(
        @User() dto: AutoLogInUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.autoLogInUser(dto)
    }

    @ApiOperation({ summary: 'Token refresh' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @Put('/refresh')
    @UseInterceptors(SaveTokenInterceptor)
    async refreshToken(
        @Cookies('token') refreshToken: string
    ): Promise<UserTokensDTO> {
        return this.authService.refreshToken({ refreshToken })
    }

    @ApiOperation({ summary: 'User log-out' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @Get('/log-out')
    @UseInterceptors(ClearTokenInterceptor)
    async logOutUser(
        @Cookies('token') refreshToken: string
    ): Promise<void> {
        return this.authService.logOutUser({ refreshToken })
    }

    @ApiOperation({ summary: 'Activation user' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
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
