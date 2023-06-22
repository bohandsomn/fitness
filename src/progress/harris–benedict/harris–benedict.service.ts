import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CalculateCaloriesDTO } from '../dto/calculate-calories.dto'
import { CalorieCalculationService } from '../calorie-calculation/calorie-calculation.service'
import { UserGender } from '../../user/user.const'

@Injectable()
export class HarrisBenedictService extends CalorieCalculationService {
    calculate(dto: CalculateCaloriesDTO): number {
        if (dto.gender === UserGender.MALE) {
            return this.calculateForMan(dto)
        } else if (dto.gender === UserGender.FEMALE) {
            return this.calculateForWoman(dto)
        }
        throw new InternalServerErrorException()
    }

    private calculateForMan(dto: CalculateCaloriesDTO): number {
        const dateDifference = this.getDaysDifference(dto.startDate, dto.endDate)
        return Math.round(88.362 + (13.397 * dto.currentWeight) + (4.799 * dto.height) - (5.677 * dto.age)) * dateDifference - (21.6 * (dto.currentWeight - dto.goalWeight))
    }

    private calculateForWoman(dto: CalculateCaloriesDTO): number {
        const dateDifference = this.getDaysDifference(dto.startDate, dto.endDate)
        return Math.round(447.593 + (9.247 * dto.currentWeight) + (3.098 * dto.height) - (4.330 * dto.age)) * dateDifference - (21.6 * (dto.currentWeight - dto.goalWeight))
    }

    private getDaysDifference(startDate: Date, endDate: Date): number {
        const dateDifference = new Date(endDate).getTime() - new Date(startDate).getTime()
        return Math.round(dateDifference / 1000 / 60 / 60)
    }
}
