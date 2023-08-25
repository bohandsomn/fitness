import { ApiProperty } from '@nestjs/swagger'
import { ValidationErrorResponseDTO } from './validation-error-response.dto'
import { ApiPropertyErrorMessage } from '../../common/decorators/api-property-error-message'
import { ApiPropertyErrorStatus } from '../../common/decorators/api-property-error-status'
import { ApiPropertyError } from '../../common/decorators/api-property-error'

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

    @ApiPropertyErrorStatus()
    readonly status: number

    @ApiPropertyErrorMessage()
    readonly message: string

    @ApiPropertyError()
    readonly name: string
}
