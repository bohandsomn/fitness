import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetSetsDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
