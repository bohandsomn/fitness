import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id'
import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value'

export class CharacteristicPreviewDTO {
    @ApiPropertyCharacteristicId()
    readonly id: number

    @ApiPropertyCharacteristicValue()
    readonly value: string
}
