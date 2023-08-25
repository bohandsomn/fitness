import { ApiPropertyToken } from '../../common/decorators/api-property-token'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class SaveTokenDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyToken()
    readonly refreshToken: string
}
