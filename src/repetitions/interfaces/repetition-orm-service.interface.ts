import { CreateRepetitionsInput } from '../dto/create-repetitions.input'
import { UpdateRepetitionsInput } from '../dto/update-repetitions.input'
import { GetRepetitionsInput } from '../dto/get-repetitions.input'
import { RepetitionModel } from '../models/repetition.model'

export interface IRepetitionOrmService {
    create(input: CreateRepetitionsInput): Promise<RepetitionModel>
    update(input: UpdateRepetitionsInput): Promise<RepetitionModel>
    queryOne(input: GetRepetitionsInput): Promise<RepetitionModel | null>
    getOne(input: GetRepetitionsInput): Promise<RepetitionModel>
}
