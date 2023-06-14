import { Difficulty, Gender, Prisma } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'
import { UserDifficulty, UserGender } from '../user.const'

export class CreateUserDTO implements Prisma.UserCreateInput {
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
    readonly goalDate: Date | string

    @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: true, nullable: false, description: 'User\'s gender' })
    readonly gender: Gender

    @ApiProperty({ example: 'qwertyui', required: true, nullable: false, description: 'User\'s unique link' })
    readonly link: string

    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly refreshToken: string

    @ApiProperty({ example: '12345678', required: true, nullable: false, description: 'User\'s password. From 8 to 12 characteristics' })
    readonly password: string
}