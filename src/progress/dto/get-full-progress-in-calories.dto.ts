import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetFullProgressInCaloriesDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
