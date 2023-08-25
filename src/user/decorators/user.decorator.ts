import { createParamDecorator, ExecutionContext, PipeTransform, Type } from '@nestjs/common'
import { GenerateTokenDTO } from '../../token/dto/generate-token.dto'
import { AppRequest } from '../../auth/interfaces/app-request.interface'

export const User = createParamDecorator((key: keyof GenerateTokenDTO, context: ExecutionContext) => {
    const request: AppRequest = context.switchToHttp().getRequest()
    const user = request.user
    return key ? user?.[key] : user
})

export const UserId = (...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]) => User('userId', ...pipes)
export const UserIsActive = (...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]) => User('isActive', ...pipes)
export const UserRole = (...pipes: (PipeTransform<any, any> | Type<PipeTransform<any, any>>)[]) => User('role', ...pipes)
