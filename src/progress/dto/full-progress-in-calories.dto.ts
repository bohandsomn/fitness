import { ApiPropertyCalories } from '../../common/decorators/api-property-calories.js'

export class FullProgressInCaloriesDTO {
    @ApiPropertyCalories()
    readonly lostCalories: number

    @ApiPropertyCalories()
    readonly goalCalories: number
}
