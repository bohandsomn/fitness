import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class IsSetOwnerDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertySetId()
    readonly setId: number
}
