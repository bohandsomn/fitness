import { Difficulty, Gender, Prisma } from '@prisma/client'

export class UpdateUserDTO implements Prisma.UserUpdateInput {
    readonly id: number
    readonly name?: string
    readonly email?: string
    readonly difficulty?: Difficulty
    readonly height?: number
    readonly weight?: number
    readonly goalWeight?: number
    readonly goalDate?: Date | string
    readonly gender?: Gender
    readonly newPassword?: string
    readonly currentPassword: string
}