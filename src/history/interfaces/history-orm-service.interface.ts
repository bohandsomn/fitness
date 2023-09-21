import { CreateHistoryInput } from '../dto/create-history.input.js'
import { GetManyHistoriesInput } from '../dto/get-many-histories.input.js'
import { HistoryModel } from '../models/history.model.js'

export interface IHistoryOrmService {
    create(input: CreateHistoryInput): Promise<HistoryModel>
    getMany(input: GetManyHistoriesInput): Promise<HistoryModel[]>
}
