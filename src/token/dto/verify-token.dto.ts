import { TokenType } from '../token.const'

export class VerifyTokenDTO {
    readonly token: string
    readonly type: TokenType
}