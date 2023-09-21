import { Injectable } from '@nestjs/common'
import { IHistoryOrmService } from '../interfaces/history-orm-service.interface.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CreateHistoryInput } from '../dto/create-history.input.js'
import { HistoryModel } from '../models/history.model.js'
import { GetManyHistoriesInput } from '../dto/get-many-histories.input.js'

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
