import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetSetDTO {
    @ApiPropertySetId()
    readonly id: number

    @ApiPropertyUserId()
    readonly userId: number
}
