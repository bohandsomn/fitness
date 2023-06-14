import { Difficulty, Gender, Prisma } from '@prisma/client'

export class CreateUserDTO implements Prisma.UserCreateInput {
    readonly name: string
    readonly email: string
    readonly difficulty: Difficulty
    readonly height: number
    readonly weight: number
    readonly goalWeight: number
    readonly goalDate: Date | string
    readonly gender: Gender
    readonly link: string
    readonly refreshToken: string
    readonly password: string
}