import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'

export class FullProgressInCaloriesDTO {
    @ApiPropertyCalories()
    readonly lostCalories: number

    @ApiPropertyCalories()
    readonly goalCalories: number
}
