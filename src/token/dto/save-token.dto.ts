import { ApiProperty } from '@nestjs/swagger'

export class SaveTokenDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly refreshToken: string
}
