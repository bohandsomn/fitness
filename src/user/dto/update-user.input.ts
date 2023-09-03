import { Difficulty, Gender, Role } from '@prisma/client'

export class UpdateUserInput {
    readonly id: number
    readonly name?: string
    readonly email?: string
    readonly difficulty?: Difficulty
    readonly height?: number
    readonly weight?: number
    readonly goalWeight?: number
    readonly goalDate?: Date | string
    readonly gender?: Gender
    readonly birthday?: Date | string
    readonly password?: string
    readonly isActive?: boolean
    readonly role?: Role
    readonly refreshToken?: string
}
