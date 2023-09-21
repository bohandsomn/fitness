import { CreateRepetitionsDTO } from '../dto/create-repetitions.dto.js'
import { UpdateRepetitionsDTO } from '../dto/update-repetitions.dto.js'
import { GetRepetitionsDTO } from '../dto/get-repetitions.dto.js'
import { RepetitionsDTO } from '../dto/repetitions.dto.js'

export interface IRepetitionsService {
    createRepetitions(dto: CreateRepetitionsDTO): Promise<RepetitionsDTO>
    updateRepetitions(dto: UpdateRepetitionsDTO): Promise<RepetitionsDTO>
    getRepetitions(dto: GetRepetitionsDTO): Promise<RepetitionsDTO>
}
