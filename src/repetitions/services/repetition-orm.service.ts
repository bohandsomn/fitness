import { IRepetitionOrmService } from '../interfaces/repetition-orm-service.interface.js'
import { UserDifficulty } from '../../user/constants/user.const.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CreateRepetitionsInput } from '../dto/create-repetitions.input.js'
import { RepetitionModel } from '../models/repetition.model.js'
import { UpdateRepetitionsInput } from '../dto/update-repetitions.input.js'
import { GetRepetitionsInput } from '../dto/get-repetitions.input.js'
import { NotFoundException } from '@nestjs/common'
import { RepetitionsException } from '../constants/repetitions.exception.js'

export abstract class RepetitionOrmService implements IRepetitionOrmService {
    constructor(
        private readonly difficulty: UserDifficulty,
        private readonly ormService: OrmService
    ) { }

    async create(input: CreateRepetitionsInput): Promise<RepetitionModel> {
        const repetition = await this.ormService.repetitions.create({
            data: {
                value: input.value,
                difficulty: this.difficulty,
                exerciseId: input.exerciseId
            }
        })
        return repetition
    }

    async update(input: UpdateRepetitionsInput): Promise<RepetitionModel> {
        const repetition = await this.ormService.repetitions.update({
            where: {
                id: input.id,
            },
            data: {
                value: input.value,
            }
        })
        return repetition
    }

    async queryOne(input: GetRepetitionsInput): Promise<RepetitionModel | null> {
        const repetition = await this.ormService.repetitions.findFirst({
            where: {
                difficulty: this.difficulty,
                exerciseId: input.exerciseId
            }
        })
        return repetition
    }

    async getOne(input: GetRepetitionsInput): Promise<RepetitionModel> {
        const repetition = await this.queryOne(input)
        if (!repetition) {
            throw new NotFoundException(RepetitionsException.NOT_FOUND)
        }
        return repetition
    }
}
