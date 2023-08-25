import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetSetCaloriesDTO {
    @ApiPropertySetId()
    readonly setId: number

    @ApiPropertyUserId()
    readonly userId: number
}
