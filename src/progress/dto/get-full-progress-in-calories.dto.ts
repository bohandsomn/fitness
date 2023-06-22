import { ApiProperty } from '@nestjs/swagger'

export class GetFullProgressInCaloriesDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number
}