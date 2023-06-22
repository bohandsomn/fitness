import { ApiProperty } from '@nestjs/swagger'

export class GetUserDTO {
    @ApiProperty({ example: 1, required: false, nullable: true, description: 'User\'s id' })
    readonly id?: number

    @ApiProperty({ example: 'bohdan.lukianchenko@gmail.com', required: false, nullable: true, description: 'User\'s email' })
    readonly email?: string

    @ApiProperty({ example: 'qwertyui', required: false, nullable: true, description: 'User\'s unique link' })
    readonly link?: string
}
