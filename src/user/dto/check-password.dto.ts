import { ApiPropertyPassword } from '../../common/decorators/api-property-password.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class CheckPasswordDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyPassword()
    readonly password: string
}
