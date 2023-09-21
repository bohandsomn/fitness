import { ApiProperty } from '@nestjs/swagger'
import { ExceptionErrorResponse } from './exception-error-response.js'
import { ApiPropertyErrorMessage } from '../../common/decorators/api-property-error-message.js'
import { ApiPropertyErrorStatus } from '../../common/decorators/api-property-error-status.js'
import { ApiPropertyError } from '../../common/decorators/api-property-error.js'

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

    @ApiProperty({ type: ExceptionErrorResponse })
    readonly response: ExceptionErrorResponse

    @ApiPropertyErrorStatus()
    readonly status: number

    @ApiPropertyErrorMessage()
    readonly message: string

    @ApiPropertyError()
    readonly name: string
}
