import { createParamDecorator, ExecutionContext, InternalServerErrorException, PipeTransform, Type } from '@nestjs/common'
import { GenerateTokenDTO } from '../../token/dto/generate-token.dto'
import { AppRequest } from '../../auth/interfaces/app-request.interface'
import { RoleException } from '../../role/constants/role.exception'

export const User = createParamDecorator((key: keyof GenerateTokenDTO, context: ExecutionContext) => {
    const request: AppRequest = context.switchToHttp().getRequest()
    const user = request.user
    if (!user) {
        throw new InternalServerErrorException(RoleException.AUTH_GUARD_IS_MISSING)
    }
    return key ? user?.[key] : user
})

export const UserId = (...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]) => User('userId', ...pipes)
export const UserIsActive = (...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]) => User('isActive', ...pipes)
export const UserRole = (...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]) => User('role', ...pipes)
