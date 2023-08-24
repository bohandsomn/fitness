import { CalculateCaloriesDTO } from '../dto/calculate-calories.dto'

export interface ICalorieCalculation {
    calculate(dto: CalculateCaloriesDTO): number
}
