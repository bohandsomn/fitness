import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id.js'
import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value.js'

export class GetCharacteristicDTO {
    @ApiPropertyCharacteristicId({ required: false, nullable: true })
    readonly id?: number

    @ApiPropertyCharacteristicValue({ required: false, nullable: true })
    readonly value?: string
}
