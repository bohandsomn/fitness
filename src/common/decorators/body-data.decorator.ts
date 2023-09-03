import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const BodyData = createParamDecorator((key: void, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest()
    const data: string | undefined = request.body.data
    const parsedData = data ? JSON.parse(data) : null
    return parsedData
})