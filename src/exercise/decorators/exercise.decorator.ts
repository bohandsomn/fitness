import { Inject, forwardRef } from '@nestjs/common'
import { ExerciseService } from '../services/exercise.service.js'

export const InjectExercise = () => Inject(forwardRef(() => ExerciseService))
