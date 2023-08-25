import { ApiPropertyEmail } from '../../common/decorators/api-property-email'
import { ApiPropertyLink } from '../../common/decorators/api-property-link'

export class EmailConfirmationDTO {
    @ApiPropertyEmail()
    readonly email: string

    @ApiPropertyLink()
    readonly link: string
}