import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetSetsDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
