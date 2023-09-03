import { Difficulty, Gender, Role } from '@prisma/client'

export class UserModel {
    id: number
    name: string
    email: string
    difficulty: Difficulty
    height: number
    weight: number
    goalWeight: number
    goalDate: Date
    birthday: Date
    gender: Gender
    role: Role
    registeredAt: Date
    link: string
    isActive: boolean
    refreshToken: string
    password: string
}