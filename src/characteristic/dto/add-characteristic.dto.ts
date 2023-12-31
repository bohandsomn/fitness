import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id.js'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'

export class AddCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly characteristicId: number

    @ApiPropertyExerciseId()
    readonly exerciseId: number
}
