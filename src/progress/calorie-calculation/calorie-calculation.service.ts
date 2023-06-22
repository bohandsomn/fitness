import { ICalorieCalculation } from '../calorie-calculation.interface'
import { CalculateCaloriesDTO } from '../dto/calculate-calories.dto'

export abstract class CalorieCalculationService implements ICalorieCalculation {
    abstract calculate(dto: CalculateCaloriesDTO): number
}
