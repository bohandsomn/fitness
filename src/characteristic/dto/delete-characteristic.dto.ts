import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id.js'

export class DeleteCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly id: number
}
