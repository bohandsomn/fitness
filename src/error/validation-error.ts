import { ApiProperty } from '@nestjs/swagger'
import { ValidationErrorResponseDTO } from './validation-error-response.dto'

export class ValidationError {
    static isValidationError(data: unknown): data is ValidationError {
        const response: Record<string, string[]> | undefined = (data as any)?.response
        const status: number | undefined = (data as any)?.status
        const message: string | undefined = (data as any)?.message
        const name: string | undefined = (data as any)?.name
        return typeof response === 'object' &&
            typeof status === 'number' &&
            typeof message === 'string' &&
            typeof name === 'string'
    }

    @ApiProperty({ type: ValidationErrorResponseDTO })
    readonly response: Record<string, string[]>

    @ApiProperty({ example: 404, required: true, nullable: false, description: 'Error status code' })
    readonly status: number

    @ApiProperty({ example: 'User is not found', required: true, nullable: false, description: 'Custom error message' })
    readonly message: string

    @ApiProperty({ example: 'Not found', required: true, nullable: false, description: 'Error message' })
    readonly name: string
}
