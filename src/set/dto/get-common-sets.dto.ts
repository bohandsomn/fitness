import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetCommonSetsDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
