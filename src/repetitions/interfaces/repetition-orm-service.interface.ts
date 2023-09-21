import { CreateRepetitionsInput } from '../dto/create-repetitions.input.js'
import { UpdateRepetitionsInput } from '../dto/update-repetitions.input.js'
import { GetRepetitionsInput } from '../dto/get-repetitions.input.js'
import { RepetitionModel } from '../models/repetition.model.js'

export interface IRepetitionOrmService {
    create(input: CreateRepetitionsInput): Promise<RepetitionModel>
    update(input: UpdateRepetitionsInput): Promise<RepetitionModel>
    queryOne(input: GetRepetitionsInput): Promise<RepetitionModel | null>
    getOne(input: GetRepetitionsInput): Promise<RepetitionModel>
}
