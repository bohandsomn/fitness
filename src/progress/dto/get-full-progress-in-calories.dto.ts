import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetFullProgressInCaloriesDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
