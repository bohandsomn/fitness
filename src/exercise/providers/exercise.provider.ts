import { Provider } from '@nestjs/common'
import { ExerciseService } from '../services/exercise.service.js'

export const ExerciseProvider: Provider = {
    provide: ExerciseService,
    useClass: ExerciseService,
}