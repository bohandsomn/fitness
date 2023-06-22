import { ApiProperty } from '@nestjs/swagger'
import { Difficulty, Gender, User } from '@prisma/client'
import { UserDifficulty, UserGender } from '../user.const'

export class UserPayloadDTO implements Partial<User> {
    @ApiProperty({ example: 'Bohdan', required: true, nullable: false, description: 'User\'s name' })
    readonly name: string

    @ApiProperty({ example: 'bohdan.lukianchenko@gmail.com', required: true, nullable: false, description: 'User\'s email' })
    readonly email: string

    @ApiProperty({ enum: UserDifficulty, example: UserDifficulty.ADVANCED, required: true, nullable: false, description: 'Difficulty in training' })
    readonly difficulty: Difficulty

    @ApiProperty({ example: 174, required: true, nullable: false, description: 'User\'s height' })
    readonly height: number

    @ApiProperty({ example: 72, required: true, nullable: false, description: 'Current weight' })
    readonly weight: number

    @ApiProperty({ example: 70, required: true, nullable: false, description: 'Goal weight. Less than current weight' })
    readonly goalWeight: number

    @ApiProperty({ example: new Date(2030, 0, 1), required: true, nullable: false, description: 'The date when the user stops training' })
    readonly goalDate: Date

    @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: true, nullable: false, description: 'User\'s gender' })
    readonly gender: Gender

    @ApiProperty({ example: new Date(2023, 5, 14), required: true, nullable: false, description: 'User registration date' })
    readonly registeredAt: Date

    @ApiProperty({ example: 20, required: true, nullable: false, description: 'Age of user' })
    readonly age: number

    @ApiProperty({ example: 2000, required: true, nullable: false, description: 'Integer calories' })
    readonly lostCalories: number

    @ApiProperty({ example: 20000, required: true, nullable: false, description: 'Integer calories' })
    readonly goalCalories: number
}
