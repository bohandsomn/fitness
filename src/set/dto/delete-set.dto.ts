import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'

export class DeleteSetDTO {
    @ApiPropertySetId()
    readonly id: number
}
