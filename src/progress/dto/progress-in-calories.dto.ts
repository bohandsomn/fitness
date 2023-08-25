import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'

export class ProgressInCaloriesDTO {
    @ApiPropertyCalories()
    readonly lostCalories: number

    @ApiPropertyCalories()
    readonly goalCalories: number

    @ApiProperty({ type: Date, required: true, nullable: false })
    readonly date: Date
}
