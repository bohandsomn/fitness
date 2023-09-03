import { Inject } from '@nestjs/common'
import { ExerciseOrmService } from '../services/exercise-orm.service'

export const InjectExerciseOrm = () => Inject(ExerciseOrmService)