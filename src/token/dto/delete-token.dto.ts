import { ApiProperty } from '@nestjs/swagger'

export class DeleteTokenDTO {
    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly refreshToken: string
}
