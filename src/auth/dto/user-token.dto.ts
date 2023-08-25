import { ApiProperty } from '@nestjs/swagger'
import { UserPayloadDTO } from '../../user/dto/user-payload.dto'
import { ApiPropertyToken } from '../../common/decorators/api-property-token'

export class UserTokenDTO {
    @ApiProperty({ type: UserPayloadDTO })
    readonly user: UserPayloadDTO

    @ApiPropertyToken()
    readonly accessToken: string
}
