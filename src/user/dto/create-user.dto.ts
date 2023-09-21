import { Difficulty, Gender, Prisma } from '@prisma/client'
import { ApiPropertyEmail } from '../../common/decorators/api-property-email.js'
import { ApiPropertyPassword } from '../../common/decorators/api-property-password.js'
import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'
import { ApiPropertyUserName } from '../../common/decorators/api-property-user-name.js'
import { ApiPropertyDifficulty } from '../../common/decorators/api-property-difficulty.js'
import { ApiPropertyUserHeight } from '../../common/decorators/api-property-user-height.js'
import { ApiPropertyUserWeight } from '../../common/decorators/api-property-user-weight.js'
import { ApiPropertyUserGoalWeight } from '../../common/decorators/api-property-user-goal-weight.js'
import { ApiPropertyUserGoalDate } from '../../common/decorators/api-property-user-goal-date.js'
import { ApiPropertyGender } from '../../common/decorators/api-property-gender.js'
import { ApiPropertyLink } from '../../common/decorators/api-property-link.js'
import { ApiPropertyUserBirthday } from '../../common/decorators/api-property-user-birthday.js'

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