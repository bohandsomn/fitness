import { IsEmail, Length } from 'class-validator'
import { AppException } from '../../constants/app.exception.js'
import { ApiPropertyEmail } from '../../common/decorators/api-property-email.js'
import { ApiPropertyPassword } from '../../common/decorators/api-property-password.js'

export class LogInUserDTO {
    @ApiPropertyEmail()
    @IsEmail({}, {
        message: AppException.EMAIL_NOT_VALID
    })
    readonly email: string

    @ApiPropertyPassword()
    @Length(8, 12, {
        message: AppException.PASSWORD_LENGTH
    })
    readonly password: string
}
