import { ApiPropertyCalories } from '../../common/decorators/api-property-calories.js'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration.js'
import { ApiPropertyExerciseDescription } from '../../common/decorators/api-property-exercise-description.js'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header.js'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'

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
