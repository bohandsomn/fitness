import { ApiProperty } from '@nestjs/swagger'
import { UserPayloadDTO } from '../../user/dto/user-payload.dto'

export class UserTokenDTO {
    @ApiProperty({ type: UserPayloadDTO })
    readonly user: UserPayloadDTO

    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly accessToken: string
}
