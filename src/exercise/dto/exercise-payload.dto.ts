import { Exercise } from '@prisma/client'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories.js'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header.js'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration.js'

export class ExercisePayloadDTO implements Partial<Exercise> {
    @ApiPropertyExerciseId()
    readonly id: number

    @ApiPropertyCalories()
    readonly calories: number

    @ApiPropertyExerciseHeader()
    readonly header: string

    @ApiPropertyDemonstration()
    readonly demonstration: string
}
