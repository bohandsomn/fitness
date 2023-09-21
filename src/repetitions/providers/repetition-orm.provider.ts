import { Provider } from '@nestjs/common'
import { BeginnerRepetitionOrmService } from '../services/beginner-repetition-orm.service.js'
import { IntermediateRepetitionOrmService } from '../services/intermediate-repetition-orm.service.js'
import { AdvancedRepetitionOrmService } from '../services/advanced-repetition-orm.service.js'

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
