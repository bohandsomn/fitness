import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class AutoLogInUserDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
