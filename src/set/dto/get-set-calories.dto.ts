import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetSetCaloriesDTO {
    @ApiPropertySetId()
    readonly setId: number

    @ApiPropertyUserId()
    readonly userId: number
}
