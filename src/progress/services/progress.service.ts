import { Inject, Injectable, forwardRef } from '@nestjs/common'
import { IProgressService } from '../interfaces/progress-service.interface'
import { GetProgressInCaloriesDTO } from '../dto/get-progress-in-calories.dto'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto'
import { FullProgressInCaloriesDTO } from '../dto/full-progress-in-calories.dto'
import { GetFullProgressInCaloriesDTO } from '../dto/get-full-progress-in-calories.dto'
import { UserService } from '../../user/services/user.service'
import { HistoryService } from '../../history/services/history.service'
import { DateService } from '../../date/services/date.service'
import { InjectCalorieCalculation } from '../decorators/inject-calorie-calculation.decorator'
import { ICalorieCalculation } from '../interfaces/calorie-calculation.interface'

@Injectable()
export class ProgressService implements IProgressService {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        @InjectCalorieCalculation() private readonly calorieCalculationService: ICalorieCalculation,
        private readonly historyService: HistoryService,
        private readonly dateService: DateService,
    ) { }

    async getProgressInCalories(dto: GetProgressInCaloriesDTO): Promise<ProgressInCaloriesDTO[]> {
        const user = await this.userService.getUser({ id: dto.userId })
        const userId = user.id
        const userPreview = await this.userService.adaptUser(user)
        const startDate = new Date(dto.startDate || userPreview.registeredAt)
        const endDate = new Date(dto.endDate || userPreview.goalDate)
        const dates = this.dateService.getDateDifference({
            startDate,
            endDate,
        })
        const histories = await Promise.all(
            dates.map((date) => this.historyService.getUserHistory({
                userId,
                startDate: date,
                endDate: date,
            }))
        )
        const dailyGoalCalories = this.calorieCalculationService.calculate({
            gender: userPreview.gender,
            currentWeight: userPreview.weight,
            goalWeight: userPreview.goalWeight,
            height: userPreview.height,
            age: userPreview.age,
            startDate: userPreview.registeredAt,
            endDate: userPreview.goalDate,
        })
        const progressInCaloriesList = histories.map((history): ProgressInCaloriesDTO => {
            return {
                date: new Date(history.date),
                lostCalories: history.calories,
                goalCalories: dailyGoalCalories
            }
        })
        return progressInCaloriesList
    }

    async getFullProgressInCalories(dto: GetFullProgressInCaloriesDTO): Promise<FullProgressInCaloriesDTO> {
        const user = await this.userService.getUser({ id: dto.userId })
        const userId = user.id
        const birthdayDate = new Date(user.birthday)
        const currentDate = new Date()
        const startDate = new Date(user.registeredAt)
        const endDate = new Date(user.goalDate)
        const age = currentDate.getFullYear() - birthdayDate.getFullYear()
        const history = await this.historyService.getUserHistory({
            userId,
            startDate,
            endDate,
        })
        const lostCalories = history.calories
        const goalCalories = this.calorieCalculationService.calculate({
            gender: user.gender,
            currentWeight: user.weight,
            goalWeight: user.goalWeight,
            height: user.height,
            age,
            startDate: user.registeredAt,
            endDate: user.goalDate,
        })
        return {
            lostCalories,
            goalCalories,
        }
    }
}
