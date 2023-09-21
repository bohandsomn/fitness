import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'

export class GetCharacteristicsByExerciseDTO {
    @ApiPropertyExerciseId()
    readonly exerciseId: number
}
