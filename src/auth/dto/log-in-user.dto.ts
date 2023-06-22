import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Length } from 'class-validator'
import { AppException } from '../../app.exception'

export class LogInUserDTO {
    @ApiProperty({ example: 'bohdan.lukianchenko@gmail.com', required: true, nullable: false, description: 'User\'s email' })
    @IsEmail({}, {
        message: AppException.EMAIL_NOT_VALID
    })
    readonly email: string

    @ApiProperty({ example: '12345678', required: true, nullable: false, description: 'User\'s password. From 8 to 12 characteristics' })
    @Length(8, 12, {
        message: AppException.PASSWORD_LENGTH
    })
    readonly password: string
}
