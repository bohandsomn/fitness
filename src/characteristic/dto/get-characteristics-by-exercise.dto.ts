import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'

export class GetCharacteristicsByExerciseDTO {
    @ApiPropertyExerciseId()
    readonly exerciseId: number
}
