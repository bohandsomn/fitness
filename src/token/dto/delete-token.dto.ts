import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'

export class DeleteTokenDTO {
    @ApiPropertyToken()
    readonly refreshToken: string
}
