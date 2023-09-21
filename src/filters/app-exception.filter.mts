import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { ColorLoggerService } from '../color-logger/services/color-logger.service.js'
import { ExceptionError } from '../error/dto/exception-error.js'
import { ValidationError } from '../error/dto/validation-error.js'
import { AppException } from '../constants/app.exception.js'
import { getSolution } from '../common/functions/get-solution.function.mjs'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly colorLoggerService: ColorLoggerService,
    ) {
        this
    }

    async catch(exception: any, host: ArgumentsHost) {
        this.colorLoggerService.error(exception)
        if (process.env.NODE_ENV !== 'production') {
            await getSolution(exception)
        }
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
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: AppException.INTERNAL_SERVER_ERROR
        })
    }
}
