import { ApiProperty } from '@nestjs/swagger'

export class ExceptionErrorResponse {
    static isExceptionErrorResponse(data: unknown): data is ExceptionErrorResponse {
        const statusCode: number | undefined = (data as any)?.statusCode
        const message: string | undefined = (data as any)?.message
        const error: string | undefined = (data as any)?.error
        return typeof statusCode === 'number' &&
            typeof message === 'string' &&
            typeof error === 'string'
    }

    @ApiProperty({ example: 404, required: true, nullable: false, description: 'Error status code' })
    readonly statusCode: number

    @ApiProperty({ example: 'User is not found', required: true, nullable: false, description: 'Custom error message' })
    readonly message: string

    @ApiProperty({ example: 'Not found', required: true, nullable: false, description: 'Error message' })
    readonly error: string
}