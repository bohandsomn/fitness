import { Exercise } from '@prisma/client'
import { CreateExerciseBodyDTO } from '../dto/create-exercise.dto.js'
import { ExercisePayloadDTO } from '../dto/exercise-payload.dto.js'
import { UpdateExerciseBodyDTO } from '../dto/update-exercise.dto.js'
import { ImageDTO } from '../../image/dto/image.dto.js'

export interface IExerciseController {
    createExercise(
        dto: CreateExerciseBodyDTO,
        imageDTO: ImageDTO
    ): Promise<ExercisePayloadDTO>
    updateExercise(
        dto: UpdateExerciseBodyDTO,
        userId: number,
        imageDTO: ImageDTO
    ): Promise<ExercisePayloadDTO>
    getOneExercise(
        exerciseId: number,
        userId: number
    ): Promise<Exercise>
    getManyExercises(
        userId: number,
        setId?: number,
        header?: string,
        caloriesFrom?: number,
        caloriesTo?: number,
        type?: string,
        bodyPart?: string,
    ): Promise<ExercisePayloadDTO[]>
    deleteExercise(exerciseId: number): Promise<void>
}
