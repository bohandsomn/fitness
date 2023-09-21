import { Inject } from '@nestjs/common'
import { ExerciseOrmService } from '../services/exercise-orm.service.js'

export const InjectExerciseOrm = () => Inject(ExerciseOrmService)