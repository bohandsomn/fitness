import { AddExerciseSetDTO } from '../dto/add-exercise-set.dto.js'
import { CreateSetDTO } from '../dto/create-set.dto.js'
import { DeleteSetDTO } from '../dto/delete-set.dto.js'
import { GetCommonSetsDTO } from '../dto/get-common-sets.dto.js'
import { GetSetCaloriesDTO } from '../dto/get-set-calories.dto.js'
import { GetSetDTO } from '../dto/get-set.dto.js'
import { GetSetsDTO } from '../dto/get-sets.dto.js'
import { IsSetOwnerDTO } from '../dto/is-set-owner.dto.js'
import { RemoveExerciseSetDTO } from '../dto/remove-exercise-set.dto.js'
import { SetPreviewDTO } from '../dto/set-preview.dto.js'
import { SetDTO } from '../dto/set.dto.js'
import { UpdateSetDTO } from '../dto/update-set.dto.js'

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
