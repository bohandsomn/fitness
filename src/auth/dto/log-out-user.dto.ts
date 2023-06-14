import { ApiProperty } from '@nestjs/swagger'

export class LogOutUserDTO {
    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly refreshToken: string
}
