import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetCommonSetsDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
