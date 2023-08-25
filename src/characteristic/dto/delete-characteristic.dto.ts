import { ApiPropertyCharacteristicId } from '../../common/decorators/api-property-characteristic-id'

export class DeleteCharacteristicDTO {
    @ApiPropertyCharacteristicId()
    readonly id: number
}
