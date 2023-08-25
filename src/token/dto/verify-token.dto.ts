import { TokenType } from '../constants/token.const'
import { ApiPropertyToken } from '../../common/decorators/api-property-token'
import { ApiPropertyTokenType } from '../../common/decorators/api-property-token-type'

export class VerifyTokenDTO {
    @ApiPropertyToken()
    readonly token: string

    @ApiPropertyTokenType()
    readonly type: TokenType
}