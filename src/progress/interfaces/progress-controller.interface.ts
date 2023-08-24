import { GetProgressInCaloriesBodyDTO } from '../dto/get-progress-in-calories.dto'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto'

export interface IProgressController {
    getProgressInCalories(dto: GetProgressInCaloriesBodyDTO, userId: number): Promise<ProgressInCaloriesDTO[]>
}
