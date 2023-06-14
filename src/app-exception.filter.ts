import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const response: Response = host.switchToHttp().getResponse()
        console.log(exception)
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
