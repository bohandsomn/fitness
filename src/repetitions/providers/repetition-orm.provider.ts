import { Provider } from '@nestjs/common'
import { BeginnerRepetitionOrmService } from '../services/beginner-repetition-orm.service'
import { IntermediateRepetitionOrmService } from '../services/intermediate-repetition-orm.service'
import { AdvancedRepetitionOrmService } from '../services/advanced-repetition-orm.service'

export const BeginnerRepetitionOrmProvider: Provider = {
    provide: BeginnerRepetitionOrmService,
    useClass: BeginnerRepetitionOrmService,
}

export const IntermediateRepetitionOrmProvider: Provider = {
    provide: IntermediateRepetitionOrmService,
    useClass: IntermediateRepetitionOrmService,
}

export const AdvancedRepetitionOrmProvider: Provider = {
    provide: AdvancedRepetitionOrmService,
    useClass: AdvancedRepetitionOrmService,
}
