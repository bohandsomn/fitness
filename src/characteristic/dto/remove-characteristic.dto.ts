import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'

export class RemoveCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly characteristicId: number

    @ApiPropertyExerciseId()
    readonly exerciseId: number
}
