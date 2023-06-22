import { ApiProperty } from '@nestjs/swagger'
import { TokensPayloadDTO } from '../../token/dto/tokens-payload.dto'
import { UserPayloadDTO } from '../../user/dto/user-payload.dto'

export class UserTokensDTO {
    @ApiProperty({ type: UserPayloadDTO })
    readonly user: UserPayloadDTO

    @ApiProperty({ type: TokensPayloadDTO })
    readonly tokens: TokensPayloadDTO
}
