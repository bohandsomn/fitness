import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { IHistoryService } from '../interfaces/history-service.interface'
import { PushHistoryDTO } from '../dto/push-history.dto'
import { GetUserHistoryDTO } from '../dto/get-user-history.dto'
import { HistoryDTO } from '../dto/history.dto'
import { DateService } from '../../date/services/date.service'
import { ExerciseService } from '../../exercise/services/exercise.service'
import { IHistoryOrmService } from '../interfaces/history-orm-service.interface'
import { InjectHistoryOrm } from '../decorators/history-orm.decorator'

@Injectable()
export class HistoryService implements IHistoryService {
    constructor(
        @InjectHistoryOrm() private readonly historyOrmService: IHistoryOrmService,
        @Inject(forwardRef(() => ExerciseService)) private readonly exerciseService: ExerciseService,
        private readonly dateService: DateService,
    ) { }

    async pushHistory(dto: PushHistoryDTO): Promise<void> {
        await this.historyOrmService.create(dto)
    }

    async getUserHistory(dto: GetUserHistoryDTO): Promise<HistoryDTO> {
        const startDateTimeDTO = this.dateService.getDateTimeStart(dto.startDate)
        const startDateTime = this.dateService.adaptDateTime(startDateTimeDTO)
        const endDateTimeDTO = this.dateService.getDateTimeEnd(dto.endDate)
        const endDateTime = this.dateService.adaptDateTime(endDateTimeDTO)
        const histories = await this.historyOrmService.getMany({
            completedAtGt: startDateTime,
            completedAtLt: endDateTime,
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
