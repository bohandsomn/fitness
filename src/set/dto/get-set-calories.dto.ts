import { ApiProperty } from '@nestjs/swagger'

export class GetSetCaloriesDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    readonly setId: number

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number
}