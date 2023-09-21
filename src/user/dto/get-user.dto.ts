import { ApiPropertyEmail } from '../../common/decorators/api-property-email.js'
import { ApiPropertyLink } from '../../common/decorators/api-property-link.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetUserDTO {
    @ApiPropertyUserId({ required: false, nullable: true })
    readonly id?: number

    @ApiPropertyEmail({ required: false, nullable: true })
    readonly email?: string

    @ApiPropertyLink({ required: false, nullable: true })
    readonly link?: string
}
