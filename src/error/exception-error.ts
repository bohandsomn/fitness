import { ExceptionErrorResponse } from './exception-error-response'

export class ExceptionError {
    static isExceptionError(data: unknown): data is ExceptionError {
        const response: ExceptionErrorResponse | undefined = (data as any)?.response
        const status: number | undefined = (data as any)?.status
        const message: string | undefined = (data as any)?.message
        const name: string | undefined = (data as any)?.name
        return ExceptionErrorResponse.isExceptionErrorResponse(response) &&
            typeof status === 'number' &&
            typeof message === 'string' &&
            typeof name === 'string'
    }

    readonly response: ExceptionErrorResponse
    readonly status: number
    readonly message: string
    readonly name: string
}
