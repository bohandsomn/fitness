import { Prisma } from '@prisma/client'

export class CreateExerciseDTO implements Prisma.ExerciseCreateInput {
    readonly calories: number
    readonly header: string
    readonly description: string
    readonly demonstration: string
}