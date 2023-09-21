import { Inject } from '@nestjs/common'
import { HarrisBenedictService } from '../services/harris–benedict.service.js'

export const InjectCalorieCalculation = () => Inject(HarrisBenedictService)