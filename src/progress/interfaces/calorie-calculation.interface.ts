import { CalculateCaloriesDTO } from '../dto/calculate-calories.dto.js'

export interface ICalorieCalculation {
    calculate(dto: CalculateCaloriesDTO): number
}
