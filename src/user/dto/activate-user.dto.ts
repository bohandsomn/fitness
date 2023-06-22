import { ApiProperty } from '@nestjs/swagger'

export class ActivateUserDTO {
    @ApiProperty({ example: 'qwertyui', required: true, nullable: false, description: 'User\'s unique link' })
    readonly link: string
}
