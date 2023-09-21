import { ApiProperty } from '@nestjs/swagger'
import { ValidationErrorResponseDTO } from './validation-error-response.dto.js'
import { ApiPropertyErrorMessage } from '../../common/decorators/api-property-error-message.js'
import { ApiPropertyErrorStatus } from '../../common/decorators/api-property-error-status.js'
import { ApiPropertyError } from '../../common/decorators/api-property-error.js'

export class ValidationError {
    static isValidationError(data: unknown): data is ValidationError {
        const response: Record<string, any> | undefined = (data as any)?.response
        const status: number | undefined = (data as any)?.status
        if (typeof status !== 'number') {
            return false
        }
        const message: string | undefined = (data as any)?.message
        if (typeof message !== 'string') {
            return false
        }
        const name: string | undefined = (data as any)?.name
        if (typeof name !== 'string') {
            return false
        }
        if (typeof response !== 'object' || response === null) {
            return false
        }
        const values = Object.keys(response)
            .map((key) => response[key])
        const isArray = values
            .map((value) => Array.isArray(value))
            .every((isArray) => isArray)
        if (!isArray) {
            return false
        }
        const isStringArray = values
            .map((value: any[]) => value.every((item) => typeof item === 'string'))
            .every((isStringArray) => isStringArray)
        if (!isStringArray) {
            return false
        }
        return true
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
