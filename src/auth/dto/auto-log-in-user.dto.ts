import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class AutoLogInUserDTO {
    @ApiPropertyUserId()
    readonly userId: number
}
