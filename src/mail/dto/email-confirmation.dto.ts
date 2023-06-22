import { ApiProperty } from '@nestjs/swagger'

export class EmailConfirmationDTO {
    @ApiProperty({ example: 'bohdan.lukianchenko@gmail.com', required: true, nullable: false, description: 'User\'s email' })
    readonly email: string

    @ApiProperty({ example: 'qwertyui', required: true, nullable: false, description: 'User\'s unique link' })
    readonly link: string
}