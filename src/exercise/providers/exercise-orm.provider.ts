import { Provider } from '@nestjs/common'
import { ExerciseOrmService } from '../services/exercise-orm.service'

export const ExerciseOrmProvider: Provider = {
    provide: ExerciseOrmService,
    useClass: ExerciseOrmService,
}