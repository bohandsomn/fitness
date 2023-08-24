import { CreateRepetitionsDTO } from '../dto/create-repetitions.dto'
import { UpdateRepetitionsDTO } from '../dto/update-repetitions.dto'
import { GetRepetitionsDTO } from '../dto/get-repetitions.dto'
import { RepetitionsDTO } from '../dto/repetitions.dto'

export interface IRepetitionsService {
    createRepetitions(dto: CreateRepetitionsDTO): Promise<RepetitionsDTO>
    updateRepetitions(dto: UpdateRepetitionsDTO): Promise<RepetitionsDTO>
    getRepetitions(dto: GetRepetitionsDTO): Promise<RepetitionsDTO>
}
