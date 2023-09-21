import { ApiProperty } from '@nestjs/swagger'
import { TokensPayloadDTO } from '../../token/dto/tokens-payload.dto.js'
import { UserPayloadDTO } from '../../user/dto/user-payload.dto.js'

export class UserTokensDTO {
    @ApiProperty({ type: UserPayloadDTO })
    readonly user: UserPayloadDTO

    @ApiProperty({ type: TokensPayloadDTO })
    readonly tokens: TokensPayloadDTO
}
