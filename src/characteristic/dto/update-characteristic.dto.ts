import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id.js'
import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value.js'

export class UpdateCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly id: number

    @ApiPropertyCharacteristicValue()
    readonly value: string
}
