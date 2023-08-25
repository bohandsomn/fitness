import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetOneExerciseDTO {
    @ApiPropertyExerciseId()
    readonly id: number

    @ApiPropertyUserId()
    readonly userId: number
}
