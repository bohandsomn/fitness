import { ApiProperty } from '@nestjs/swagger'

export class ProgressInCaloriesDTO {
    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly lostCalories: number

    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly goalCalories: number

    @ApiProperty({ type: Date, required: true, nullable: false })
    readonly date: Date
}
