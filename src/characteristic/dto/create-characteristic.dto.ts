import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value.js'

export class CreateCharacteristicDTO {
    @ApiPropertyCharacteristicValue()
    readonly value: string
}
