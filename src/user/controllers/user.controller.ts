import { Body, Controller, HttpStatus, Patch, Put, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IUserController } from '../interfaces/user-controller.interface'
import { UserService } from '../services/user.service'
import { UpdateUserBodyDTO } from '../dto/update-user.dto'
import { UserId } from '../decorators/user.decorator'
import { UserTokensDTO } from '../../auth/dto/user-tokens.dto'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { AppValidationPipe } from '../../pipes/app-validation.pipe'
import { TokenService } from '../../token/services/token.service'
import { SaveTokenInterceptor } from '../../auth/interceptors/save-token.interceptor'
import { AssignAdminRoleDTO } from '../dto/assign-admin-role.dto'
import { AssignRoleGuard } from '../../role/guards/assign-role.guard'
import { UserTokenDTO } from '../../auth/dto/user-token.dto'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization'

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
    @UseInterceptors(SaveTokenInterceptor)
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
    @UseInterceptors(SaveTokenInterceptor)
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
