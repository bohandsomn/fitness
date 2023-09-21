import { Module } from '@nestjs/common'
import { RepetitionsService } from './services/repetitions.service.js'
import { AdvancedRepetitionOrmProvider, BeginnerRepetitionOrmProvider, IntermediateRepetitionOrmProvider } from './providers/repetition-orm.provider.js'

@Module({
  providers: [RepetitionsService, BeginnerRepetitionOrmProvider, IntermediateRepetitionOrmProvider, AdvancedRepetitionOrmProvider],
  exports: [RepetitionsService],
})
export class RepetitionsModule { }
