import { ApiPropertyErrorMessage } from '../../common/decorators/api-property-error-message'

export class ExceptionErrorResponseDTO {
    @ApiPropertyErrorMessage()
    readonly message: string
}