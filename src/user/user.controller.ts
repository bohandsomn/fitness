import { Body, Controller, HttpStatus, Patch, Put, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IUserController } from './user-controller.interface'
import { UserService } from './user.service'
import { UpdateUserBodyDTO } from './dto/update-user.dto'
import { User } from './user.decorator'
import { UserTokensDTO } from '../auth/dto/user-tokens.dto'
import { AuthGuard } from '../auth/auth.guard'
import { AppValidationPipe } from '../app-validation.pipe'
import { TokenService } from '../token/token.service'
import { SaveTokenInterceptor } from 'src/auth/save-token.interceptor'
import { AssignAdminRoleDTO } from './dto/assign-admin-role.dto'
import { AssignRoleGuard } from 'src/role/assign-role.guard'
import { UserTokenDTO } from 'src/auth/dto/user-token.dto'
import { ValidationErrorResponseDTO } from 'src/error/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from 'src/error/exception-error-response.dto'

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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Put()
    @UseInterceptors(SaveTokenInterceptor)
    @UseGuards(AuthGuard)
    async updateUser(
        @Body(AppValidationPipe) dto: UpdateUserBodyDTO,
        @User('userId') userId: number,
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
    @ApiHeaders([
        { name: 'assign', description: 'The Assign header is needed to assign admin role to the user' }
    ])
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
