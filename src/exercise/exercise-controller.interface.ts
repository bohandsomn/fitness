import { Exercise } from '@prisma/client'
import { CreateExerciseBodyDTO } from './dto/create-exercise.dto'
import { ExercisePayloadDTO } from './dto/exercise-payload.dto'
import { UpdateExerciseBodyDTO } from './dto/update-exercise.dto'
import { ImageDTO } from '../image/dto/image.dto'

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
        setId?: number,
        header?: string,
        caloriesFrom?: number,
        caloriesTo?: number,
        type?: string,
        bodyPart?: string,
    ): Promise<ExercisePayloadDTO[]>
    deleteExercise(exerciseId: number): Promise<void>
}
