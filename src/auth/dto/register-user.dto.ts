import { Difficulty, Gender, Prisma } from '@prisma/client'
import { IsEmail, Length, IsString, IsNumber } from 'class-validator'
import { AppException } from '../../constants/app.exception'
import { ApiPropertyEmail } from '../../common/decorators/api-property-email'
import { ApiPropertyPassword } from '../../common/decorators/api-property-password'
import { ApiPropertyUserName } from '../../common/decorators/api-property-user-name'
import { ApiPropertyDifficulty } from '../../common/decorators/api-property-difficulty'
import { ApiPropertyUserHeight } from '../../common/decorators/api-property-user-height'
import { ApiPropertyUserWeight } from '../../common/decorators/api-property-user-weight'
import { ApiPropertyUserGoalWeight } from '../../common/decorators/api-property-user-goal-weight'
import { ApiPropertyUserGoalDate } from '../../common/decorators/api-property-user-goal-date'
import { ApiPropertyGender } from '../../common/decorators/api-property-gender'
import { ApiPropertyUserBirthday } from '../../common/decorators/api-property-user-birthday'

export class RegisterUserDTO implements Omit<Prisma.UserCreateInput, 'link' | 'refreshToken'> {
    @ApiPropertyUserName()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly name: string

    @ApiPropertyEmail()
    @IsEmail({}, {
        message: AppException.EMAIL_NOT_VALID
    })
    readonly email: string

    @ApiPropertyDifficulty()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly difficulty: Difficulty

    @ApiPropertyUserHeight()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly height: number

    @ApiPropertyUserWeight()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly weight: number

    @ApiPropertyUserGoalWeight()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly goalWeight: number

    @ApiPropertyUserGoalDate()
    @IsString({
        message: AppException.DATE_NOT_VALID,
    })
    readonly goalDate: Date | string

    @ApiPropertyGender()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly gender: Gender

    @ApiPropertyUserBirthday()
    @IsString({
        message: AppException.DATE_NOT_VALID,
    })
    readonly birthday: Date | string

    @ApiPropertyPassword()
    @Length(8, 12, {
        message: AppException.PASSWORD_LENGTH
    })
    readonly password: string
}
