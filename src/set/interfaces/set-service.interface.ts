import { AddExerciseSetDTO } from '../dto/add-exercise-set.dto'
import { CreateSetDTO } from '../dto/create-set.dto'
import { DeleteSetDTO } from '../dto/delete-set.dto'
import { GetCommonSetsDTO } from '../dto/get-common-sets.dto'
import { GetSetCaloriesDTO } from '../dto/get-set-calories.dto'
import { GetSetDTO } from '../dto/get-set.dto'
import { GetSetsDTO } from '../dto/get-sets.dto'
import { IsSetOwnerDTO } from '../dto/is-set-owner.dto'
import { RemoveExerciseSetDTO } from '../dto/remove-exercise-set.dto'
import { SetPreviewDTO } from '../dto/set-preview.dto'
import { SetDTO } from '../dto/set.dto'
import { UpdateSetDTO } from '../dto/update-set.dto'

export interface ISetService {
    createSet(dto: CreateSetDTO): Promise<SetPreviewDTO>
    updateSet(dto: UpdateSetDTO): Promise<SetPreviewDTO>
    getSet(dto: GetSetDTO): Promise<SetDTO>
    getSets(dto: GetSetsDTO): Promise<SetPreviewDTO[]>
    deleteSet(dto: DeleteSetDTO): Promise<void>
    addExerciseSet(dto: AddExerciseSetDTO): Promise<void>
    removeExerciseSet(dto: RemoveExerciseSetDTO): Promise<void>
    isSetOwner(dto: IsSetOwnerDTO): Promise<boolean>
    getSetCalories(dto: GetSetCaloriesDTO): Promise<number>
    getCommonSets(dto: GetCommonSetsDTO): Promise<SetPreviewDTO[]>
}
