import { CreateSetBodyDTO } from '../dto/create-set.dto'
import { SetDTO } from '../dto/set.dto'
import { UpdateSetBodyDTO } from '../dto/update-set.dto'
import { SetPreviewDTO } from '../dto/set-preview.dto'
import { ImageDTO } from '../../image/dto/image.dto'

export interface ISetController {
    createSet(dto: CreateSetBodyDTO, imageDTO: ImageDTO, userId: number): Promise<SetPreviewDTO>
    updateSet(dto: UpdateSetBodyDTO, imageDTO: ImageDTO | undefined, userId: number): Promise<SetPreviewDTO>
    getSet(id: number, userId: number): Promise<SetDTO>
    getSets(userId: number): Promise<SetPreviewDTO[]>
    deleteSet(id: number, userId: number): Promise<void>
    addExerciseSet(exerciseId: number, setId: number): Promise<void>
    removeExerciseSet(exerciseId: number, setId: number): Promise<void>
    getCommonSets(userId: number): Promise<SetPreviewDTO[]>
}
