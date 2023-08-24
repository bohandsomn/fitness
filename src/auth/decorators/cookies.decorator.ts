import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const Cookies = createParamDecorator(
    (key: string | undefined, context: ExecutionContext): object | string => {
        const request: Request = context.switchToHttp().getRequest()
        const cookies: object | undefined = request.cookies
        if (key && cookies?.[key]) {
            return cookies[key]
        }
        return cookies || {}
    }
)
