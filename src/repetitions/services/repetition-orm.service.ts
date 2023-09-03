import { IRepetitionOrmService } from '../interfaces/repetition-orm-service.interface'
import { UserDifficulty } from '../../user/constants/user.const'
import { OrmService } from '../../orm/services/orm.service'
import { CreateRepetitionsInput } from '../dto/create-repetitions.input'
import { RepetitionModel } from '../models/repetition.model'
import { UpdateRepetitionsInput } from '../dto/update-repetitions.input'
import { GetRepetitionsInput } from '../dto/get-repetitions.input'
import { NotFoundException } from '@nestjs/common'
import { RepetitionsException } from '../constants/repetitions.exception'

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
