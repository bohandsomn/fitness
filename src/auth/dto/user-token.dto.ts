import { ApiProperty } from '@nestjs/swagger'
import { UserPayloadDTO } from '../../user/dto/user-payload.dto.js'
import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'

export class UserTokenDTO {
    @ApiProperty({ type: UserPayloadDTO })
    readonly user: UserPayloadDTO

    @ApiPropertyToken()
    readonly accessToken: string
}
