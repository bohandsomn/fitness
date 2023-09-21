import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'

export class DeleteExerciseDTO {
    @ApiPropertyExerciseId()
    readonly id: number
}
