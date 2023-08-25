import { Exercise } from '@prisma/client'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'

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
