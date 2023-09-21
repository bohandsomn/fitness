import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'

export class RefreshTokenDTO {
    @ApiPropertyToken()
    readonly refreshToken: string
}
