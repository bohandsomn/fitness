import { FullProgressInCaloriesDTO } from './dto/full-progress-in-calories.dto'
import { GetFullProgressInCaloriesDTO } from './dto/get-full-progress-in-calories.dto'
import { GetProgressInCaloriesDTO } from './dto/get-progress-in-calories.dto'
import { ProgressInCaloriesDTO } from './dto/progress-in-calories.dto'

export interface IProgressService {
    getProgressInCalories(dto: GetProgressInCaloriesDTO): Promise<ProgressInCaloriesDTO[]>
    getFullProgressInCalories(dto: GetFullProgressInCaloriesDTO): Promise<FullProgressInCaloriesDTO>
}
