import { ExerciseModel } from '../models/exercise.model.js'
import { CreateExerciseInput } from '../dto/create-exercise.input.js'
import { UpdateExerciseInput } from '../dto/update-exercise.input.js'
import { GetExercisesInput } from '../dto/get-exercises.input.js'
import { DeleteExerciseInput } from '../dto/delete-exercise.input.js'
import { GetOneExerciseInput } from '../dto/get-one-exercise.input.js'

export interface IExerciseOrmService {
    create(input: CreateExerciseInput): Promise<ExerciseModel>
    update(input: UpdateExerciseInput): Promise<ExerciseModel>
    getMany(input: GetExercisesInput): Promise<ExerciseModel[]>
    delete(input: DeleteExerciseInput): Promise<void>
    queryOne(input: GetOneExerciseInput): Promise<ExerciseModel | null>
}