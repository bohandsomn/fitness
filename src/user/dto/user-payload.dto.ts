import { Difficulty, Gender, User } from '@prisma/client'

export class UserPayloadDTO implements Partial<User> {
    readonly name: string
    readonly email: string
    readonly difficulty: Difficulty
    readonly height: number
    readonly weight: number
    readonly goalWeight: number
    readonly goalDate: Date
    readonly gender: Gender
    readonly registeredAt: Date
}
