import { Difficulty, Gender } from '@prisma/client'

export class CreateUserInput {
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
    readonly birthday: Date | string
    readonly password: string
}