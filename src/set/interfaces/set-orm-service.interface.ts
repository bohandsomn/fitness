import { AddExerciseSetInput } from '../dto/add-exercise-set.input'
import { CreateSetInput } from '../dto/create-set.input'
import { DeleteSetInput } from '../dto/delete-set.input'
import { GetSetInput } from '../dto/get-set.input'
import { GetSetsInput } from '../dto/get-sets.input'
import { RemoveExerciseSetInput } from '../dto/remove-exercise-set.input'
import { UpdateSetInput } from '../dto/update-set.input'
import { SetModel } from '../models/set.model'

export interface ISetOrmService {
    create(input: CreateSetInput): Promise<SetModel>
    update(input: UpdateSetInput): Promise<SetModel>
    queryOne(input: GetSetInput): Promise<SetModel | null>
    getMany(input: GetSetsInput): Promise<SetModel[]>
    delete(input: DeleteSetInput): Promise<void>
    add(input: AddExerciseSetInput): Promise<void>
    remove(input: RemoveExerciseSetInput): Promise<void>
}
