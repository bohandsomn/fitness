import { ApiPropertyError } from '../../common/decorators/api-property-error'
import { ApiPropertyErrorMessage } from '../../common/decorators/api-property-error-message'
import { ApiPropertyErrorStatus } from '../../common/decorators/api-property-error-status'

export class ExceptionErrorResponse {
    static isExceptionErrorResponse(data: unknown): data is ExceptionErrorResponse {
        const statusCode: number | undefined = (data as any)?.statusCode
        const message: string | undefined = (data as any)?.message
        const error: string | undefined = (data as any)?.error
        return typeof statusCode === 'number' &&
            typeof message === 'string' &&
            typeof error === 'string'
    }

    @ApiPropertyErrorStatus()
    readonly statusCode: number

    @ApiPropertyErrorMessage()
    readonly message: string

    @ApiPropertyError()
    readonly error: string
}