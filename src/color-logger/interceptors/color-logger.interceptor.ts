import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common'
import { Request } from 'express'
import { Observable, map } from 'rxjs'
import { ColorLoggerService } from '../services/color-logger.service.js'

@Injectable()
export class ColorLoggerInterceptor implements NestInterceptor {
    constructor(
        private readonly colorLoggerService: ColorLoggerService
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isDev = process.env.NODE_ENV === 'development'
        const request: Request = context.switchToHttp().getRequest()
        if (isDev) {
            this.colorLoggerService.debug({
                url: `${request.headers.host || 'host'}${request.baseUrl}${request.path}`,
                method: request.method,
                body: request.body,
                params: request.params,
                query: request.query,
                cookies: request.cookies,
                headers: request.headers,
            })
        }
        return next.handle().pipe(map((responseData) => {
            if (isDev && !(responseData instanceof StreamableFile)) {
                this.colorLoggerService.debug(responseData)
            }
            return responseData
        }))
    }
}
