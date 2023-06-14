import { Difficulty, Gender, Prisma } from '@prisma/client'
import { IsEmail, Length, IsString, IsNumber, IsDateString } from 'class-validator'
import { AppException } from '../../app.exception'

export class RegisterUserDTO implements Omit<Prisma.UserCreateInput, 'link' | 'refreshToken'> {
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly name: string

    @IsEmail({}, {
        message: AppException.EMAIL_NOT_VALID
    })
    readonly email: string

    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly difficulty: Difficulty

    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly height: number

    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly weight: number

    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly goalWeight: number

    @IsDateString({}, {
        message: AppException.DATE_NOT_VALID,
    })
    readonly goalDate: Date | string

    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly gender: Gender

    @Length(8, 12, {
        message: AppException.PASSWORD_LENGTH
    })
    readonly password: string
}
