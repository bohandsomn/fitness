import { Inject } from '@nestjs/common'
import { BeginnerRepetitionOrmService } from '../services/beginner-repetition-orm.service'
import { IntermediateRepetitionOrmService } from '../services/intermediate-repetition-orm.service'
import { AdvancedRepetitionOrmService } from '../services/advanced-repetition-orm.service'

export const InjectBeginnerRepetitionOrm = () => Inject(BeginnerRepetitionOrmService)
export const InjectIntermediateRepetitionOrm = () => Inject(IntermediateRepetitionOrmService)
export const InjectAdvancedRepetitionOrm = () => Inject(AdvancedRepetitionOrmService)
