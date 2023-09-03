import { Difficulty, Repetitions } from '@prisma/client'

export class RepetitionModel implements Repetitions {
    id: number
    difficulty: Difficulty
    value: number
    exerciseId: number
}