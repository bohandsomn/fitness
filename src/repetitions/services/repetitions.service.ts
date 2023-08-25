import { Injectable, NotFoundException } from '@nestjs/common'
import { Repetitions } from '@prisma/client'
import { IRepetitionsService } from '../interfaces/repetitions-service.interface'
import { OrmService } from '../../orm/services/orm.service'
import { CreateRepetitionsDTO } from '../dto/create-repetitions.dto'
import { RepetitionsDTO } from '../dto/repetitions.dto'
import { UserDifficulty } from '../../user/constants/user.const'
import { UpdateRepetitionsDTO } from '../dto/update-repetitions.dto'
import { GetRepetitionsDTO } from '../dto/get-repetitions.dto'
import { RepetitionsException } from '../constants/repetitions.exception'
import { UpdateRepetitionDTO } from '../dto/update-repetition.dto'
import { GetRepetitionDTO } from '../dto/get-repetition.dto'

@Injectable()
export class RepetitionsService implements IRepetitionsService {
    constructor(
        private readonly ormService: OrmService
    ) { }

    async createRepetitions(dto: CreateRepetitionsDTO): Promise<RepetitionsDTO> {
        const beginner = await this.ormService.repetitions.create({
            data: {
                value: dto.beginnerRepetitions,
                difficulty: UserDifficulty.BEGINNER,
                exerciseId: dto.exerciseId
            }
        })
        const intermediate = await this.ormService.repetitions.create({
            data: {
                value: dto.intermediateRepetitions,
                difficulty: UserDifficulty.INTERMEDIATE,
                exerciseId: dto.exerciseId
            }
        })
        const advanced = await this.ormService.repetitions.create({
            data: {
                value: dto.advancedRepetitions,
                difficulty: UserDifficulty.ADVANCED,
                exerciseId: dto.exerciseId
            }
        })
        return {
            beginner: beginner.value,
            intermediate: intermediate.value,
            advanced: advanced.value,
        }
    }

    async updateRepetitions(dto: UpdateRepetitionsDTO): Promise<RepetitionsDTO> {
        const beginner = await this.getRepetition({
            exerciseId: dto.exerciseId,
            difficulty: UserDifficulty.BEGINNER
        })
        const intermediate = await this.getRepetition({
            exerciseId: dto.exerciseId,
            difficulty: UserDifficulty.INTERMEDIATE
        })
        const advanced = await this.getRepetition({
            exerciseId: dto.exerciseId,
            difficulty: UserDifficulty.ADVANCED
        })
        const updatedBeginner = beginner && dto.beginnerRepetitions
            ? await this.updateRepetition({
                id: beginner.id,
                value: dto.beginnerRepetitions
            })
            : beginner
        const updatedIntermediate = intermediate && dto.intermediateRepetitions
            ? await this.updateRepetition({
                id: intermediate.id,
                value: dto.intermediateRepetitions
            })
            : intermediate
        const updatedAdvanced = advanced && dto.advancedRepetitions
            ? await this.updateRepetition({
                id: advanced.id,
                value: dto.advancedRepetitions
            })
            : advanced
        return {
            beginner: updatedBeginner.value,
            intermediate: updatedIntermediate.value,
            advanced: updatedAdvanced.value,
        }
    }

    async getRepetitions(dto: GetRepetitionsDTO): Promise<RepetitionsDTO> {
        const beginner = await this.getRepetition({
            exerciseId: dto.exerciseId,
            difficulty: UserDifficulty.BEGINNER
        })
        const intermediate = await this.getRepetition({
            exerciseId: dto.exerciseId,
            difficulty: UserDifficulty.INTERMEDIATE
        })
        const advanced = await this.getRepetition({
            exerciseId: dto.exerciseId,
            difficulty: UserDifficulty.ADVANCED
        })
        return {
            beginner: beginner.value,
            intermediate: intermediate.value,
            advanced: advanced.value,
        }
    }

    private async updateRepetition(dto: UpdateRepetitionDTO): Promise<Repetitions> {
        return this.ormService.repetitions.update({
            where: {
                id: dto.id,
            },
            data: {
                value: dto.value,
            }
        })
    }

    private async getRepetition(dto: GetRepetitionDTO): Promise<Repetitions> {
        const repetitions = await this.ormService.repetitions.findFirst({
            where: {
                difficulty: dto.difficulty,
                exerciseId: dto.exerciseId
            }
        })
        if (!repetitions) {
            throw new NotFoundException(RepetitionsException.NOT_FOUND)
        }
        return repetitions
    }
}
