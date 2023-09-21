import { ApiPropertyEmail } from '../../common/decorators/api-property-email.js'
import { ApiPropertyLink } from '../../common/decorators/api-property-link.js'

export class EmailConfirmationDTO {
    @ApiPropertyEmail()
    readonly email: string

    @ApiPropertyLink()
    readonly link: string
}