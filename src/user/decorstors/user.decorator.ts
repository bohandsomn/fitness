import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GenerateTokenDTO } from '../../token/dto/generate-token.dto'
import { AppRequest } from '../../auth/interfaces/app-request.interface'

export const User = createParamDecorator((key: keyof GenerateTokenDTO, context: ExecutionContext) => {
    const request: AppRequest = context.switchToHttp().getRequest()
    const user = request.user
    return key ? user?.[key] : user
})
