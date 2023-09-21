import { AddExerciseSetInput } from '../dto/add-exercise-set.input.js'
import { CreateSetInput } from '../dto/create-set.input.js'
import { DeleteSetInput } from '../dto/delete-set.input.js'
import { GetSetInput } from '../dto/get-set.input.js'
import { GetSetsInput } from '../dto/get-sets.input.js'
import { RemoveExerciseSetInput } from '../dto/remove-exercise-set.input.js'
import { UpdateSetInput } from '../dto/update-set.input.js'
import { SetModel } from '../models/set.model.js'

export interface ISetOrmService {
    create(input: CreateSetInput): Promise<SetModel>
    update(input: UpdateSetInput): Promise<SetModel>
    queryOne(input: GetSetInput): Promise<SetModel | null>
    getMany(input: GetSetsInput): Promise<SetModel[]>
    delete(input: DeleteSetInput): Promise<void>
    add(input: AddExerciseSetInput): Promise<void>
    remove(input: RemoveExerciseSetInput): Promise<void>
}
