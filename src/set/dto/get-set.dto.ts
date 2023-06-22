import { ApiProperty } from '@nestjs/swagger'

export class GetSetDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    readonly id: number

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number
}
