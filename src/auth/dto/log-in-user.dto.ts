import { IsEmail, Length } from 'class-validator'
import { AppException } from '../../app.exception'

export class LogInUserDTO {
    @IsEmail({}, {
        message: AppException.EMAIL_NOT_VALID
    })
    readonly email: string

    @Length(8, 12, {
        message: AppException.PASSWORD_LENGTH
    })
    readonly password: string
}
