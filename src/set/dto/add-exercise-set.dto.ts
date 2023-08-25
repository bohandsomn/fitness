import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'

export class AddExerciseSetDTO {
    @ApiPropertyExerciseId()
    readonly exerciseId: number

    @ApiPropertySetId()
    readonly setId: number
}
