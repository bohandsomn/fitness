import { ApiPropertyPassword } from '../../common/decorators/api-property-password'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class CheckPasswordDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyPassword()
    readonly password: string
}
