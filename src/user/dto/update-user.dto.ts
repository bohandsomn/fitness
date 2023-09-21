import { ApiProperty } from '@nestjs/swagger'
import { Difficulty, Gender, Prisma } from '@prisma/client'
import { UserDifficulty, UserGender } from '../constants/user.const.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'
import { ApiPropertyPassword } from '../../common/decorators/api-property-password.js'
import { ApiPropertyUserBirthday } from '../../common/decorators/api-property-user-birthday.js'
import { ApiPropertyUserName } from '../../common/decorators/api-property-user-name.js'
import { ApiPropertyEmail } from '../../common/decorators/api-property-email.js'
import { ApiPropertyDifficulty } from '../../common/decorators/api-property-difficulty.js'
import { ApiPropertyUserHeight } from '../../common/decorators/api-property-user-height.js'
import { ApiPropertyUserWeight } from '../../common/decorators/api-property-user-weight.js'
import { ApiPropertyUserGoalWeight } from '../../common/decorators/api-property-user-goal-weight.js'
import { ApiPropertyUserGoalDate } from '../../common/decorators/api-property-user-goal-date.js'
import { ApiPropertyGender } from '../../common/decorators/api-property-gender.js'
import { AppDate } from '../../common/services/app-date.service.js'

export class UpdateUserDTO implements Prisma.UserUpdateInput {
    @ApiPropertyUserId()
    readonly id: number

    @ApiPropertyUserName({ required: false, nullable: true })
    readonly name?: string

    @ApiPropertyEmail({ required: false, nullable: true })
    readonly email?: string

    @ApiPropertyDifficulty({ required: false, nullable: true })
    readonly difficulty?: Difficulty

    @ApiPropertyUserHeight({ required: false, nullable: true })
    readonly height?: number

    @ApiPropertyUserWeight({ required: false, nullable: true })
    readonly weight?: number

    @ApiPropertyUserGoalWeight({ required: false, nullable: true })
    readonly goalWeight?: number

    @ApiPropertyUserGoalDate({ required: false, nullable: true })
    readonly goalDate?: Date | string

    @ApiPropertyGender({ required: false, nullable: true })
    readonly gender?: Gender

    @ApiPropertyUserBirthday()
    readonly birthday?: Date | string

    @ApiPropertyPassword({ required: false, nullable: true })
    readonly newPassword?: string

    @ApiPropertyPassword()
    readonly currentPassword: string
}

export class UpdateUserBodyDTO {
    @ApiProperty({ example: 'Bohdan', required: false, nullable: true, description: 'User\'s name' })
    readonly name?: string

    @ApiProperty({ example: 'bohdan.lukianchenko@gmail.com', required: false, nullable: true, description: 'User\'s email' })
    readonly email?: string

    @ApiProperty({ enum: UserDifficulty, example: UserDifficulty.ADVANCED, required: false, nullable: true, description: 'Difficulty in training' })
    readonly difficulty?: Difficulty

    @ApiProperty({ example: 174, required: false, nullable: true, description: 'User\'s height' })
    readonly height?: number

    @ApiProperty({ example: 72, required: false, nullable: true, description: 'Current weight' })
    readonly weight?: number

    @ApiProperty({ example: 70, required: false, nullable: true, description: 'Goal weight. Less than current weight' })
    readonly goalWeight?: number

    @ApiProperty({ example: new AppDate(2030, 0, 1), required: false, nullable: true, description: 'The date when the user stops training' })
    readonly goalDate?: Date | string

    @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: false, nullable: true, description: 'User\'s gender' })
    readonly gender?: Gender

    @ApiProperty({ example: '12345678', required: false, nullable: true, description: 'User\'s password. From 8 to 12 characteristics' })
    readonly newPassword?: string

    @ApiPropertyPassword()
    readonly currentPassword: string
}