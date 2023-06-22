import { ApiProperty } from '@nestjs/swagger'
import { Difficulty, Gender, Prisma } from '@prisma/client'
import { UserDifficulty, UserGender } from '../user.const'

export class UpdateUserDTO implements Prisma.UserUpdateInput {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly id: number

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

    @ApiProperty({ example: new Date(2030, 0, 1), required: false, nullable: true, description: 'The date when the user stops training' })
    readonly goalDate?: Date | string

    @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: false, nullable: true, description: 'User\'s gender' })
    readonly gender?: Gender

    @ApiProperty({ example: new Date(2000, 0, 1), required: true, nullable: false, description: 'User\'s date of birth' })
    readonly birthday?: Date | string

    @ApiProperty({ example: '12345678', required: false, nullable: true, description: 'User\'s password. From 8 to 12 characteristics' })
    readonly newPassword?: string

    @ApiProperty({ example: '12345678', required: true, nullable: false, description: 'User\'s password. From 8 to 12 characteristics' })
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

    @ApiProperty({ example: new Date(2030, 0, 1), required: false, nullable: true, description: 'The date when the user stops training' })
    readonly goalDate?: Date | string

    @ApiProperty({ enum: UserGender, example: UserGender.MALE, required: false, nullable: true, description: 'User\'s gender' })
    readonly gender?: Gender

    @ApiProperty({ example: '12345678', required: false, nullable: true, description: 'User\'s password. From 8 to 12 characteristics' })
    readonly newPassword?: string

    @ApiProperty({ example: '12345678', required: true, nullable: false, description: 'User\'s password. From 8 to 12 characteristics' })
    readonly currentPassword: string
}