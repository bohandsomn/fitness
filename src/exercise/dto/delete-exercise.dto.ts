import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'

export class DeleteExerciseDTO {
    @ApiPropertyExerciseId()
    readonly id: number
}
