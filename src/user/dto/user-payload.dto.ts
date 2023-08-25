import { ApiProperty } from '@nestjs/swagger'
import { Difficulty, Gender, User } from '@prisma/client'
import { ApiPropertyEmail } from '../../common/decorators/api-property-email'
import { ApiPropertyUserName } from '../../common/decorators/api-property-user-name'
import { ApiPropertyDifficulty } from '../../common/decorators/api-property-difficulty'
import { ApiPropertyUserHeight } from '../../common/decorators/api-property-user-height'
import { ApiPropertyUserWeight } from '../../common/decorators/api-property-user-weight'
import { ApiPropertyUserGoalWeight } from '../../common/decorators/api-property-user-goal-weight'
import { ApiPropertyUserGoalDate } from '../../common/decorators/api-property-user-goal-date'
import { ApiPropertyGender } from '../../common/decorators/api-property-gender'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'

export class UserPayloadDTO implements Partial<User> {
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
    readonly goalDate: Date

    @ApiPropertyGender()
    readonly gender: Gender

    @ApiProperty({ example: new Date(2023, 5, 14), required: true, nullable: false, description: 'User registration date' })
    readonly registeredAt: Date

    @ApiProperty({ example: 20, required: true, nullable: false, description: 'Age of user' })
    readonly age: number

    @ApiPropertyCalories({ example: 2000 })
    readonly lostCalories: number

    @ApiPropertyCalories({ example: 20000 })
    readonly goalCalories: number
}
