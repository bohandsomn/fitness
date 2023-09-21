import { Body, Controller, Post, Get, UseGuards, Put, Param, Res, HttpStatus, UseInterceptors, HttpCode } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { IAuthController } from '../interfaces/auth-controller.interface.js'
import { AuthService } from '../services/auth.service.js'
import { RegisterUserDTO } from '../dto/register-user.dto.js'
import { UserTokensDTO } from '../dto/user-tokens.dto.js'
import { LogInUserDTO } from '../dto/log-in-user.dto.js'
import { AuthGuard } from '../guards/auth.guard.js'
import { Cookies } from '../decorators/cookies.decorator.js'
import { SaveTokeninterceptor } from '../interceptors/save-token.interceptor.js'
import { EmailConfirmationinterceptor } from '../interceptors/email-confirmation.interceptor.js'
import { CreateUserPipe } from '../../user/pipes/create-user.pipe.js'
import { UserId } from '../../user/decorators/user.decorator.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { ClearTokenInterceptor } from '../interceptors/clear-token.interceptor.js'
import { UserTokenDTO } from '../dto/user-token.dto.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { Environment } from '../../common/constants/environment.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'

@ApiTags('Auth')
@Controller('auth')
export class AuthController implements IAuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    @ApiOperation({ summary: 'User registration' })
    @ApiResponse({ status: HttpStatus.CREATED, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @Post('/register')
    @UseInterceptors(EmailConfirmationinterceptor, SaveTokeninterceptor)
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
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(SaveTokeninterceptor)
    async logInUser(
        @Body(AppValidationPipe) dto: LogInUserDTO
    ): Promise<UserTokensDTO> {
        return this.authService.logInUser(dto)
    }

    @ApiOperation({ summary: 'User auto-log-in' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Get('/auto-log-in')
    @UseInterceptors(SaveTokeninterceptor)
    @UseGuards(AuthGuard)
    async autoLogInUser(
        @UserId() userId: number
    ): Promise<UserTokensDTO> {
        return this.authService.autoLogInUser({ userId })
    }

    @ApiOperation({ summary: 'Token refresh' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiCookieAuth('token')
    @Put('/refresh')
    @UseInterceptors(SaveTokeninterceptor)
    async refreshToken(
        @Cookies('token') refreshToken: string
    ): Promise<UserTokensDTO> {
        return this.authService.refreshToken({ refreshToken })
    }

    @ApiOperation({ summary: 'User log-out' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiCookieAuth('token')
    @Get('/log-out')
    @UseInterceptors(ClearTokenInterceptor)
    async logOutUser(
        @Cookies('token') refreshToken: string
    ): Promise<void> {
        return this.authService.logOutUser({ refreshToken })
    }

    @ApiOperation({ summary: 'Activation user' })
    @ApiResponse({ status: HttpStatus.MOVED_PERMANENTLY })
    @ApiResponse({ status: HttpStatus.NOT_FOUND })
    @Get('/activate/:link')
    async activateUser(
        @Param('link') link: string,
        @Res() response: Response
    ): Promise<void> {
        await this.authService.activateUser({ link })
        return response
            .status(HttpStatus.MOVED_PERMANENTLY)
            .redirect(this.configService.getOrThrow(Environment.CLIENT_LINK))
    }
}
