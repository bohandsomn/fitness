import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class DeleteSetDTO {
    @ApiPropertySetId()
    readonly id: number

    @ApiPropertyUserId()
    readonly userId: number
}
