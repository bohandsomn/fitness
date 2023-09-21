import { ApiPropertyLink } from '../../common/decorators/api-property-link.js'

export class ActivateUserDTO {
    @ApiPropertyLink()
    readonly link: string
}
