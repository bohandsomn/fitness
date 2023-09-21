import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id.js'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'

export class RemoveCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly characteristicId: number

    @ApiPropertyExerciseId()
    readonly exerciseId: number
}
