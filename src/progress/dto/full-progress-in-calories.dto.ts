import { ApiProperty } from '@nestjs/swagger'

export class FullProgressInCaloriesDTO {
    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly lostCalories: number

    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly goalCalories: number
}
