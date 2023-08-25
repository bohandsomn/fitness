import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id'
import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value'

export class UpdateCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly id: number

    @ApiPropertyCharacteristicValue()
    readonly value: string
}
