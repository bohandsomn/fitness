import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'
import { ApiPropertyExerciseDescription } from '../../common/decorators/api-property-exercise-description'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'

export class ExerciseDTO {
    @ApiPropertyExerciseId()
    readonly id: number

    @ApiPropertyCalories()
    readonly calories: number

    @ApiPropertyExerciseDescription()
    readonly description: string

    @ApiPropertyExerciseHeader()
    readonly header: string

    @ApiPropertyDemonstration()
    readonly demonstration: string
}
