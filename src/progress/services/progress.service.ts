import { Injectable } from '@nestjs/common'
import { IProgressService } from '../interfaces/progress-service.interface.js'
import { GetProgressInCaloriesDTO } from '../dto/get-progress-in-calories.dto.js'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto.js'
import { FullProgressInCaloriesDTO } from '../dto/full-progress-in-calories.dto.js'
import { GetFullProgressInCaloriesDTO } from '../dto/get-full-progress-in-calories.dto.js'
import { HistoryService } from '../../history/services/history.service.js'
import { DateService } from '../../date/services/date.service.js'
import { InjectCalorieCalculation } from '../decorators/inject-calorie-calculation.decorator.js'
import { ICalorieCalculation } from '../interfaces/calorie-calculation.interface.js'
import { AppDate } from '../../common/services/app-date.service.js'
import { InjectUser } from '../../user/decorators/user-service.decorator.js'
import { IUserService } from '../../user/interfaces/user-service.interface.js'

@Injectable()
export class ProgressService implements IProgressService {
    constructor(
        @InjectUser() private readonly userService: IUserService,
        @InjectCalorieCalculation() private readonly calorieCalculationService: ICalorieCalculation,
        private readonly historyService: HistoryService,
        private readonly dateService: DateService,
    ) { }

    async getProgressInCalories(dto: GetProgressInCaloriesDTO): Promise<ProgressInCaloriesDTO[]> {
        const user = await this.userService.getUser({ id: dto.userId })
        const userId = user.id
        const userPreview = await this.userService.adaptUser(user)
        const startDate = new AppDate(dto.startDate || userPreview.registeredAt)
        const endDate = new AppDate(dto.endDate || userPreview.goalDate)
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
                date: new AppDate(history.date),
                lostCalories: history.calories,
                goalCalories: dailyGoalCalories
            }
        })
        return progressInCaloriesList
    }

    async getFullProgressInCalories(dto: GetFullProgressInCaloriesDTO): Promise<FullProgressInCaloriesDTO> {
        const user = await this.userService.getUser({ id: dto.userId })
        const userId = user.id
        const birthdayDate = new AppDate(user.birthday)
        const currentDate = new AppDate()
        const startDate = new AppDate(user.registeredAt)
        const endDate = new AppDate(user.goalDate)
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
