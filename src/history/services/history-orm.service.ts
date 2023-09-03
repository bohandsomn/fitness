import { Injectable } from '@nestjs/common'
import { IHistoryOrmService } from '../interfaces/history-orm-service.interface'
import { OrmService } from '../../orm/services/orm.service'
import { CreateHistoryInput } from '../dto/create-history.input'
import { HistoryModel } from '../models/history.model'
import { GetManyHistoriesInput } from '../dto/get-many-histories.input'

@Injectable()
export class HistoryOrmService implements IHistoryOrmService {
    constructor(
        private readonly ormService: OrmService
    ) { }

    async create(input: CreateHistoryInput): Promise<HistoryModel> {
        const history = await this.ormService.history.create({
            data: input
        })
        return history
    }

    async getMany(input: GetManyHistoriesInput): Promise<HistoryModel[]> {
        const histories = await this.ormService.history.findMany({
            where: {
                completedAt: {
                    gt: input.completedAtGt,
                    lt: input.completedAtLt,
                }
            }
        })
        return histories
    }
}
