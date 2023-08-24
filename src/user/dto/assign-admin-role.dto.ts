import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { AppException } from 'src/constants/app.exception'

export class AssignAdminRoleDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly userId: number
}