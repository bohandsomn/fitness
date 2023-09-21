import { Body, Controller, HttpStatus, Patch, Put, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IUserController } from '../interfaces/user-controller.interface.js'
import { UserService } from '../services/user.service.js'
import { UpdateUserBodyDTO } from '../dto/update-user.dto.js'
import { UserId } from '../decorators/user.decorator.js'
import { UserTokensDTO } from '../../auth/dto/user-tokens.dto.js'
import { AuthGuard } from '../../auth/guards/auth.guard.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { TokenService } from '../../token/services/token.service.js'
import { SaveTokeninterceptor } from '../../auth/interceptors/save-token.interceptor.js'
import { AssignAdminRoleDTO } from '../dto/assign-admin-role.dto.js'
import { AssignRoleGuard } from '../../role/guards/assign-role.guard.js'
import { UserTokenDTO } from '../../auth/dto/user-token.dto.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'

@ApiTags('User')
@Controller('user')
export class UserController implements IUserController {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) { }

    @ApiOperation({ summary: 'Updating user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Put()
    @UseInterceptors(SaveTokeninterceptor)
    @UseGuards(AuthGuard)
    async updateUser(
        @Body(AppValidationPipe) dto: UpdateUserBodyDTO,
        @UserId() userId: number,
    ): Promise<UserTokensDTO> {
        const user = await this.userService.updateUser({ ...dto, id: userId })
        const userPayload = await this.userService.adaptUser(user)
        const tokens = this.tokenService.generateTokens({
            userId: user.id,
            isActive: user.isActive,
            role: user.role,
        })
        await this.tokenService.saveToken({
            userId: user.id,
            refreshToken: tokens.refreshToken,
        })
        return {
            user: userPayload,
            tokens
        }
    }

    @ApiOperation({ summary: 'Assigning an admin role to the user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserTokenDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Patch()
    @UseInterceptors(SaveTokeninterceptor)
    @UseGuards(AssignRoleGuard)
    async assignAdminRole(
        @Body(AppValidationPipe) dto: AssignAdminRoleDTO,
    ): Promise<UserTokensDTO> {
        const user = await this.userService.assignAdminRole(dto)
        const userPayload = await this.userService.adaptUser(user)
        const tokens = this.tokenService.generateTokens({
            userId: user.id,
            isActive: user.isActive,
            role: user.role,
        })
        await this.tokenService.saveToken({
            userId: user.id,
            refreshToken: tokens.refreshToken,
        })
        return {
            user: userPayload,
            tokens
        }
    }
}
