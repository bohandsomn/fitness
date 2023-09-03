import { CreateHistoryInput } from '../dto/create-history.input'
import { GetManyHistoriesInput } from '../dto/get-many-histories.input'
import { HistoryModel } from '../models/history.model'

export interface IHistoryOrmService {
    create(input: CreateHistoryInput): Promise<HistoryModel>
    getMany(input: GetManyHistoriesInput): Promise<HistoryModel[]>
}
