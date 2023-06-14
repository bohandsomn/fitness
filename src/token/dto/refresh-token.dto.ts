import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDTO {
    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly refreshToken: string
}
