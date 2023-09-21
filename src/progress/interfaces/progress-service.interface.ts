import { FullProgressInCaloriesDTO } from '../dto/full-progress-in-calories.dto.js'
import { GetFullProgressInCaloriesDTO } from '../dto/get-full-progress-in-calories.dto.js'
import { GetProgressInCaloriesDTO } from '../dto/get-progress-in-calories.dto.js'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto.js'

export interface IProgressService {
    getProgressInCalories(dto: GetProgressInCaloriesDTO): Promise<ProgressInCaloriesDTO[]>
    getFullProgressInCalories(dto: GetFullProgressInCaloriesDTO): Promise<FullProgressInCaloriesDTO>
}
