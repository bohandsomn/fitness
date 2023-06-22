import { ApiProperty } from '@nestjs/swagger'
import { ValidationErrorResponse } from './validation-error-response'

export class ValidationErrorResponseDTO {
    @ApiProperty({ type: ValidationErrorResponse })
    readonly message: ValidationErrorResponse
}
