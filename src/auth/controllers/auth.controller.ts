import { Body, Controller, Post, Get, UseGuards, Put, Param, Res, HttpStatus, UseInterceptors, HttpCode } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { IAuthController } from '../interfaces/auth-controller.interface'
import { AuthService } from '../services/auth.service'
import { RegisterUserDTO } from '../dto/register-user.dto'
import { UserTokensDTO } from '../dto/user-tokens.dto'
import { LogInUserDTO } from '../dto/log-in-user.dto'
import { AuthGuard } from '../guards/auth.guard'
import { Cookies } from '../decorators/cookies.decorator'
import { SaveTokenInterceptor } from '../interceptors/save-token.interceptor'
import { EmailConfirmationInterceptor } from '../interceptors/email-confirmation.interceptor'
import { CreateUserPipe } from '../../user/pipes/create-user.pipe'
import { UserId } from '../../user/decorators/user.decorator'
import { AppValidationPipe } from '../../pipes/app-validation.pipe'
import { ClearTokenInterceptor } from '../interceptors/clear-token.interceptor'
import { UserTokenDTO } from '../dto/user-token.dto'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto'
import { Environment } from '../../common/constants/environment'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization'

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
    @HttpCode(HttpStatus.OK)
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
    @ApiPropertyHeadersAuthorization()
    @Get('/auto-log-in')
    @UseInterceptors(SaveTokenInterceptor)
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
    @UseInterceptors(SaveTokenInterceptor)
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
