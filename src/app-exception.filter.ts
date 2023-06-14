import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ColorLoggerService } from './color-logger/color-logger.service'
import { ExceptionError } from './error/exception-error'
import { ValidationError } from './error/validation-error'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly colorLoggerService: ColorLoggerService,
    ) { }

    catch(exception: any, host: ArgumentsHost) {
        this.colorLoggerService.error(exception)
        const response: Response = host.switchToHttp().getResponse()
        if (ExceptionError.isExceptionError(exception)) {
            return response.status(exception.status).json({
                message: exception.message
            })
        }
        if (ValidationError.isValidationError(exception)) {
            return response.status(exception.status).json({
                message: exception.response
            })
        }
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(null)
    }
}
