import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value'

export class CreateCharacteristicDTO {
    @ApiPropertyCharacteristicValue()
    readonly value: string
}
