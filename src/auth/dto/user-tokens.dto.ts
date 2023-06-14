import { TokensPayloadDTO } from '../../token/dto/tokens-payload.dto'
import { UserPayloadDTO } from '../../user/dto/user-payload.dto'

export class UserTokensDTO {
    readonly user: UserPayloadDTO
    readonly tokens: TokensPayloadDTO
}
