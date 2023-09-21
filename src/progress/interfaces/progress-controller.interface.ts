import { GetProgressInCaloriesBodyDTO } from '../dto/get-progress-in-calories.dto.js'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto.js'

export interface IProgressController {
    getProgressInCalories(dto: GetProgressInCaloriesBodyDTO, userId: number): Promise<ProgressInCaloriesDTO[]>
}
