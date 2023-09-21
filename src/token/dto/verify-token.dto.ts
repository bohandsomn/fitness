import { TokenType } from '../constants/token.const.js'
import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'
import { ApiPropertyTokenType } from '../../common/decorators/api-property-token-type.js'

export class VerifyTokenDTO {
    @ApiPropertyToken()
    readonly token: string

    @ApiPropertyTokenType()
    readonly type: TokenType
}