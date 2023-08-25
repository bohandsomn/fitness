import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id'

export class AddCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly characteristicId: number

    @ApiPropertyExerciseId()
    readonly exerciseId: number
}
