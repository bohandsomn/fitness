import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { Observable, map } from 'rxjs'
import { ColorLoggerService } from './color-logger.service'

@Injectable()
export class ColorLoggerInterceptor implements NestInterceptor {
    constructor(
        private readonly colorLoggerService: ColorLoggerService
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest()
        this.colorLoggerService.debug({
            url: `${request.headers.host || 'host'}${request.baseUrl}${request.path}`,
            method: request.method,
            body: request.body,
            params: request.params,
            query: request.query,
            cookies: request.cookies,
            headers: request.headers,
        })
        return next.handle().pipe(map((responseData) => {
            this.colorLoggerService.debug({
                responseData
            })
            return responseData
        }))
    }
}
