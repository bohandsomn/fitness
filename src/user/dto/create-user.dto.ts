import { Difficulty, Gender, Prisma } from '@prisma/client'
import { ApiPropertyEmail } from '../../common/decorators/api-property-email'
import { ApiPropertyPassword } from '../../common/decorators/api-property-password'
import { ApiPropertyToken } from '../../common/decorators/api-property-token'
import { ApiPropertyUserName } from '../../common/decorators/api-property-user-name'
import { ApiPropertyDifficulty } from '../../common/decorators/api-property-difficulty'
import { ApiPropertyUserHeight } from '../../common/decorators/api-property-user-height'
import { ApiPropertyUserWeight } from '../../common/decorators/api-property-user-weight'
import { ApiPropertyUserGoalWeight } from '../../common/decorators/api-property-user-goal-weight'
import { ApiPropertyUserGoalDate } from '../../common/decorators/api-property-user-goal-date'
import { ApiPropertyGender } from '../../common/decorators/api-property-gender'
import { ApiPropertyLink } from '../../common/decorators/api-property-link'
import { ApiPropertyUserBirthday } from '../../common/decorators/api-property-user-birthday'

export class CreateUserDTO implements Prisma.UserCreateInput {
    @ApiPropertyUserName()
    readonly name: string

    @ApiPropertyEmail()
    readonly email: string

    @ApiPropertyDifficulty()
    readonly difficulty: Difficulty

    @ApiPropertyUserHeight()
    readonly height: number

    @ApiPropertyUserWeight()
    readonly weight: number

    @ApiPropertyUserGoalWeight()
    readonly goalWeight: number

    @ApiPropertyUserGoalDate()
    readonly goalDate: Date | string

    @ApiPropertyGender()
    readonly gender: Gender

    @ApiPropertyLink()
    readonly link: string

    @ApiPropertyToken()
    readonly refreshToken: string

    @ApiPropertyUserBirthday()
    readonly birthday: Date | string

    @ApiPropertyPassword()
    readonly password: string
}