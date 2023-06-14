import { ApiProperty } from '@nestjs/swagger'
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

    @ApiProperty({ type: ExceptionErrorResponse })
    readonly response: ExceptionErrorResponse

    @ApiProperty({ example: 404, required: true, nullable: false, description: 'Error status code' })
    readonly status: number

    @ApiProperty({ example: 'User is not found', required: true, nullable: false, description: 'Custom error message' })
    readonly message: string

    @ApiProperty({ example: 'Not found', required: true, nullable: false, description: 'Error message' })
    readonly name: string
}
