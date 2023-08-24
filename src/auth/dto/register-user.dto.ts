import { Difficulty, Gender, Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Length, IsString, IsNumber, IsEmpty } from 'class-validator'
import { AppException } from '../../constants/app.exception'
import { UserDifficulty, UserGender } from '../../user/constants/user.const'

export class RegisterUserDTO implements Omit<Prisma.UserCreateInput, 'link' | 'refreshToken'> {
    @ApiProperty({ example: 'Bohdan', required: true, nullable: false, description: 'User\'s name' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly name: string

    @ApiProperty({ example: 'bohdan.lukianchenko@gmail.com', required: true, nullable: false, description: 'User\'s email' })
    @IsEmail({}, {
        message: AppException.EMAIL_NOT_VALID
    })
    readonly email: string

    @ApiProperty({ enum: UserDifficulty, example: UserDifficulty.ADVANCED, required: true, nullable: false, description: 'Difficulty in training' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly difficulty: Difficulty

    @ApiProperty({ example: 174, required: true, nullable: false, description: 'User\'s height' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly height: number

    @ApiProperty({ example: 72, required: true, nullable: false, description: 'Current weight' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly weight: number

    @ApiProperty({ example: 70, required: true, nullable: false, description: 'Goal weight. Less than current weight' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly goalWeight: number

    @ApiProperty({ example: new Date(2030, 0, 1), required: true, nullable: false, description: 'The date when the user stops training' })
    @IsString({
        message: AppException.DATE_NOT_VALID,
    })
    readonly goalDate: Date | string

    @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: true, nullable: false, description: 'User\'s gender' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly gender: Gender

    @ApiProperty({ example: new Date(2000, 0, 1), required: true, nullable: false, description: 'User\'s date of birth' })
    @IsString({
        message: AppException.DATE_NOT_VALID,
    })
    readonly birthday: Date | string

    @ApiProperty({ example: '12345678', required: true, nullable: false, description: 'User\'s password. From 8 to 12 characteristics' })
    @Length(8, 12, {
        message: AppException.PASSWORD_LENGTH
    })
    readonly password: string
}
