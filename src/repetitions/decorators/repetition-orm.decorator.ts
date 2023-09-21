import { Inject } from '@nestjs/common'
import { BeginnerRepetitionOrmService } from '../services/beginner-repetition-orm.service.js'
import { IntermediateRepetitionOrmService } from '../services/intermediate-repetition-orm.service.js'
import { AdvancedRepetitionOrmService } from '../services/advanced-repetition-orm.service.js'

export const InjectBeginnerRepetitionOrm = () => Inject(BeginnerRepetitionOrmService)
export const InjectIntermediateRepetitionOrm = () => Inject(IntermediateRepetitionOrmService)
export const InjectAdvancedRepetitionOrm = () => Inject(AdvancedRepetitionOrmService)
