import { ApiPropertyToken } from '../../common/decorators/api-property-token'

export class RefreshTokenDTO {
    @ApiPropertyToken()
    readonly refreshToken: string
}
