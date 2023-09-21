import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'
export class TokensPayloadDTO {
    @ApiPropertyToken()
    readonly accessToken: string

    @ApiPropertyToken()
    readonly refreshToken: string
}
