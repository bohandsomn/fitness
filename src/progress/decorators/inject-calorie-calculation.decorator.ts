import { Inject } from '@nestjs/common'
import { HarrisBenedictService } from '../services/harris–benedict.service'

export const InjectCalorieCalculation = () => Inject(HarrisBenedictService)