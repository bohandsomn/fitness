import { ExerciseModel } from '../models/exercise.model'
import { CreateExerciseInput } from '../dto/create-exercise.input'
import { UpdateExerciseInput } from '../dto/update-exercise.input'
import { GetExercisesInput } from '../dto/get-exercises.input'
import { DeleteExerciseInput } from '../dto/delete-exercise.input'
import { GetOneExerciseInput } from '../dto/get-one-exercise.input'

export interface IExerciseOrmService {
    create(input: CreateExerciseInput): Promise<ExerciseModel>
    update(input: UpdateExerciseInput): Promise<ExerciseModel>
    getMany(input: GetExercisesInput): Promise<ExerciseModel[]>
    delete(input: DeleteExerciseInput): Promise<void>
    queryOne(input: GetOneExerciseInput): Promise<ExerciseModel | null>
}