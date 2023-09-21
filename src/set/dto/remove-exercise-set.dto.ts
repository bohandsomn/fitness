import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'

export class RemoveExerciseSetDTO {
    @ApiPropertyExerciseId()
    readonly exerciseId: number

    @ApiPropertySetId()
    readonly setId: number
}
