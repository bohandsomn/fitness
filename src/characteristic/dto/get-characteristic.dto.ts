import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id'
import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value'

export class GetCharacteristicDTO {
    @ApiPropertyCharacteristicId({ required: false, nullable: true })
    readonly id?: number

    @ApiPropertyCharacteristicValue({ required: false, nullable: true })
    readonly value?: string
}
