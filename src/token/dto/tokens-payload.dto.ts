import { ApiPropertyToken } from '../../common/decorators/api-property-token'
export class TokensPayloadDTO {
    @ApiPropertyToken()
    readonly accessToken: string

    @ApiPropertyToken()
    readonly refreshToken: string
}
