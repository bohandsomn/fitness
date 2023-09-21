import { CreateExerciseDTO } from '../dto/create-exercise.dto.js'
import { ExercisePayloadDTO } from '../dto/exercise-payload.dto.js'
import { UpdateExerciseDTO } from '../dto/update-exercise.dto.js'
import { GetOneExerciseDTO } from '../dto/get-one-exercise.dto.js'
import { GetManyExercisesDTO } from '../dto/get-many-exercises.dto.js'
import { DeleteExerciseDTO } from '../dto/delete-exercise.dto.js'
import { ExerciseDTO } from '../dto/exercise.dto.js'
import { GetExerciseCaloriesDTO } from '../dto/get-exercise-calories.dto.js'

export interface IExerciseService {
    createExercise(dto: CreateExerciseDTO): Promise<ExercisePayloadDTO>
    updateExercise(dto: UpdateExerciseDTO): Promise<ExercisePayloadDTO>
    getOneExercise(dto: GetOneExerciseDTO): Promise<ExerciseDTO>
    getManyExercises(dto: GetManyExercisesDTO): Promise<ExercisePayloadDTO[]>
    deleteExercise(dto: DeleteExerciseDTO): Promise<void>
    adaptExercise(exercise: ExerciseDTO): ExercisePayloadDTO
    getExerciseCalories(dto: GetExerciseCaloriesDTO): Promise<number>
}
