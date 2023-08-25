import { IsNumber } from 'class-validator'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'
import { AppException } from '../../constants/app.exception'

export class PushHistoryDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyExerciseId()
    readonly exerciseId: number
}

export class PushHistoryBodyDTO {
    @ApiPropertyExerciseId()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly exerciseId: number
}
