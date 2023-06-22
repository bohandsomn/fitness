import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { IHistoryService } from './history-service.interface'
import { PushHistoryDTO } from './dto/push-history.dto'
import { GetUserHistoryDTO } from './dto/get-user-history.dto'
import { HistoryDTO } from './dto/history.dto'
import { OrmService } from '../orm/orm.service'
import { DateService } from '../date/date.service'
import { ExerciseService } from '../exercise/exercise.service'

@Injectable()
export class HistoryService implements IHistoryService {
    constructor(
        private readonly ormService: OrmService,
        private readonly dateService: DateService,
        @Inject(forwardRef(() => ExerciseService)) private readonly exerciseService: ExerciseService,
    ) { }

    async pushHistory(dto: PushHistoryDTO): Promise<void> {
        await this.ormService.history.create({
            data: dto
        })
    }

    async getUserHistory(dto: GetUserHistoryDTO): Promise<HistoryDTO> {
        const startDateTimeDTO = this.dateService.getDateTimeStart(dto.startDate)
        const startDateTime = this.dateService.adaptDateTime(startDateTimeDTO)
        const endDateTimeDTO = this.dateService.getDateTimeEnd(dto.endDate)
        const endDateTime = this.dateService.adaptDateTime(endDateTimeDTO)
        const histories = await this.ormService.history.findMany({
            where: {
                completedAt: {
                    gt: startDateTime,
                    lt: endDateTime,
                }
            }
        })
        const exercises = await Promise.all(
            histories.map((history) => this.exerciseService.getOneExercise({
                id: history.exerciseId,
                userId: dto.userId
            }))
        )
        const calories = exercises.reduce((sum, exercise) => sum + exercise.calories, 0)
        const exercisePayloads = exercises.map((exercise) => this.exerciseService.adaptExercise(exercise))
        return {
            date: startDateTime,
            exercises: exercisePayloads,
            calories,
        }
    }
}
