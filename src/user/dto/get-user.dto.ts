import { ApiPropertyEmail } from '../../common/decorators/api-property-email'
import { ApiPropertyLink } from '../../common/decorators/api-property-link'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetUserDTO {
    @ApiPropertyUserId({ required: false, nullable: true })
    readonly id?: number

    @ApiPropertyEmail({ required: false, nullable: true })
    readonly email?: string

    @ApiPropertyLink({ required: false, nullable: true })
    readonly link?: string
}
