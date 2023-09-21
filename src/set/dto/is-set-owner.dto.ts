import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class IsSetOwnerDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertySetId()
    readonly setId: number
}
