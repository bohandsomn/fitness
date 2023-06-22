import { ApiProperty } from '@nestjs/swagger'
export class TokensPayloadDTO {
    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly accessToken: string

    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly refreshToken: string
}
