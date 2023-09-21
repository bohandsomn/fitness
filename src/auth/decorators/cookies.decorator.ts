import { createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Request } from 'express'
import { AppException } from '../../constants/app.exception.js'

export const Cookies = createParamDecorator(
    (key: string | undefined, context: ExecutionContext): object | string => {
        const request: Request = context.switchToHttp().getRequest()
        const cookies: object | undefined = request.cookies
        if (key) {
            if (cookies?.[key]) {
                return cookies[key]
            }
            throw new ForbiddenException(AppException.COOKIE_IS_EMPTY)
        }
        return cookies || {}
    }
)
