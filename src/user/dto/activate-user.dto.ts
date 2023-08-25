import { ApiPropertyLink } from '../../common/decorators/api-property-link'

export class ActivateUserDTO {
    @ApiPropertyLink()
    readonly link: string
}
