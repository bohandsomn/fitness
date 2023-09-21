import { IsNumber } from 'class-validator'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'
import { AppException } from '../../constants/app.exception.js'

export class AssignAdminRoleDTO {
    @ApiPropertyUserId()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly userId: number
}