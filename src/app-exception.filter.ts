import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { ColorLoggerService } from './color-logger/color-logger.service'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly colorLoggerService: ColorLoggerService,
    ) { }

    catch(exception: any, host: ArgumentsHost) {
        this.colorLoggerService.error(exception)
        const response: Response = host.switchToHttp().getResponse()
        if (this.isHttpException(exception)) {
            const exceptionResponse = exception.getResponse()
            const status = exception.getStatus()
            return response.status(status).json(exceptionResponse)
        }
        return null
    }

    private isHttpException(data: unknown): data is HttpException {
        const response = (data as HttpException)?.getResponse?.()
        return response !== undefined
    }
}
