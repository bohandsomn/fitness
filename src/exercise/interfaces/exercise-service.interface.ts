import { CreateExerciseDTO } from '../dto/create-exercise.dto'
import { ExercisePayloadDTO } from '../dto/exercise-payload.dto'
import { UpdateExerciseDTO } from '../dto/update-exercise.dto'
import { GetOneExerciseDTO } from '../dto/get-one-exercise.dto'
import { GetManyExercisesDTO } from '../dto/get-many-exercises.dto'
import { DeleteExerciseDTO } from '../dto/delete-exercise.dto'
import { ExerciseDTO } from '../dto/exercise.dto'
import { GetExerciseCaloriesDTO } from '../dto/get-exercise-calories.dto'

export interface IExerciseService {
    createExercise(dto: CreateExerciseDTO): Promise<ExercisePayloadDTO>
    updateExercise(dto: UpdateExerciseDTO): Promise<ExercisePayloadDTO>
    getOneExercise(dto: GetOneExerciseDTO): Promise<ExerciseDTO>
    getManyExercises(dto: GetManyExercisesDTO): Promise<ExercisePayloadDTO[]>
    deleteExercise(dto: DeleteExerciseDTO): Promise<void>
    adaptExercise(exercise: ExerciseDTO): ExercisePayloadDTO
    getExerciseCalories(dto: GetExerciseCaloriesDTO): Promise<number>
}
