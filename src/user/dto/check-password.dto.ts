import { ApiProperty } from '@nestjs/swagger'

export class CheckPasswordDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ example: '12345678', required: true, nullable: false, description: 'User\'s password. From 8 to 12 characteristics' })
    readonly password: string
}
