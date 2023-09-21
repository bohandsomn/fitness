import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetOneExerciseDTO {
    @ApiPropertyExerciseId()
    readonly id: number

    @ApiPropertyUserId()
    readonly userId: number
}
