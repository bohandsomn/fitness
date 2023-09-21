import { ApiPropertyErrorMessage } from '../../common/decorators/api-property-error-message.js'

export class ExceptionErrorResponseDTO {
    @ApiPropertyErrorMessage()
    readonly message: string
}