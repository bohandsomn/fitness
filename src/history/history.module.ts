import { Module, forwardRef } from '@nestjs/common'
import { HistoryService } from './services/history.service.js'
import { HistoryController } from './controllers/history.controller.js'
import { ExerciseModule } from '../exercise/exercise.module.js'
import { TokenModule } from '../token/token.module.js'
import { HistoryOrmProvider } from './providers/history-orm.provider.js'

@Module({
  imports: [forwardRef(() => ExerciseModule), TokenModule],
  providers: [HistoryService, HistoryOrmProvider],
  exports: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
