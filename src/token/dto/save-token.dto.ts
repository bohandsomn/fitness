import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class SaveTokenDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyToken()
    readonly refreshToken: string
}
