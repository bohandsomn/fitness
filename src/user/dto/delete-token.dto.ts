import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class DeleteTokenDTO {
    @ApiPropertyUserId()
    readonly userId: number
}