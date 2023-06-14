export class ExceptionErrorResponse {
    static isExceptionErrorResponse(data: unknown): data is ExceptionErrorResponse {
        const statusCode: number | undefined = (data as any)?.statusCode
        const message: string | undefined = (data as any)?.message
        const error: string | undefined = (data as any)?.error
        return typeof statusCode === 'number' &&
            typeof message === 'string' &&
            typeof error === 'string'
    }

    readonly statusCode: number
    readonly message: string
    readonly error: string
}