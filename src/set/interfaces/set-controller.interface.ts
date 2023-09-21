import { CreateSetBodyDTO } from '../dto/create-set.dto.js'
import { SetDTO } from '../dto/set.dto.js'
import { UpdateSetBodyDTO } from '../dto/update-set.dto.js'
import { SetPreviewDTO } from '../dto/set-preview.dto.js'
import { ImageDTO } from '../../image/dto/image.dto.js'

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
