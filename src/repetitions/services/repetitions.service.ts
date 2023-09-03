import { Injectable } from '@nestjs/common'
import { IRepetitionsService } from '../interfaces/repetitions-service.interface'
import { CreateRepetitionsDTO } from '../dto/create-repetitions.dto'
import { RepetitionsDTO } from '../dto/repetitions.dto'
import { UpdateRepetitionsDTO } from '../dto/update-repetitions.dto'
import { GetRepetitionsDTO } from '../dto/get-repetitions.dto'
import { InjectAdvancedRepetitionOrm, InjectBeginnerRepetitionOrm, InjectIntermediateRepetitionOrm } from '../decorators/repetition-orm.decorator'
import { IRepetitionOrmService } from '../interfaces/repetition-orm-service.interface'

@Injectable()
export class RepetitionsService implements IRepetitionsService {
    constructor(
        @InjectBeginnerRepetitionOrm() private readonly beginner: IRepetitionOrmService,
        @InjectIntermediateRepetitionOrm() private readonly intermediate: IRepetitionOrmService,
        @InjectAdvancedRepetitionOrm() private readonly advanced: IRepetitionOrmService,
    ) { }

    async createRepetitions(dto: CreateRepetitionsDTO): Promise<RepetitionsDTO> {
        const [beginner, intermediate, advanced] = await this.allCreate(dto)
        return {
            beginner: beginner.value,
            intermediate: intermediate.value,
            advanced: advanced.value,
        }
    }

    async updateRepetitions(dto: UpdateRepetitionsDTO): Promise<RepetitionsDTO> {
        const [beginner, intermediate, advanced] = await this.allGetOne(dto.exerciseId)
        const updatedBeginner = dto.beginnerRepetitions
            ? await this.beginner.update({
                id: beginner.id,
                value: dto.beginnerRepetitions
            })
            : beginner
        const updatedIntermediate = dto.intermediateRepetitions
            ? await this.intermediate.update({
                id: intermediate.id,
                value: dto.intermediateRepetitions
            })
            : intermediate
        const updatedAdvanced = dto.advancedRepetitions
            ? await this.advanced.update({
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
        const [beginner, intermediate, advanced] = await this.allGetOne(dto.exerciseId)
        return {
            beginner: beginner.value,
            intermediate: intermediate.value,
            advanced: advanced.value,
        }
    }

    private async allCreate(dto: CreateRepetitionsDTO) {
        const beginner = await this.beginner.create({
            value: dto.beginnerRepetitions,
            exerciseId: dto.exerciseId
        })
        const intermediate = await this.intermediate.create({
            value: dto.intermediateRepetitions,
            exerciseId: dto.exerciseId
        })
        const advanced = await this.advanced.create({
            value: dto.advancedRepetitions,
            exerciseId: dto.exerciseId
        })
        return [beginner, intermediate, advanced] as const
    }

    private async allGetOne(exerciseId: number) {
        const beginner = await this.beginner.getOne({
            exerciseId,
        })
        const intermediate = await this.intermediate.getOne({
            exerciseId,
        })
        const advanced = await this.advanced.getOne({
            exerciseId,
        })
        return [beginner, intermediate, advanced] as const
    }
}
