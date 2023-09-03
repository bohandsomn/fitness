import { Module, forwardRef } from '@nestjs/common'
import { HistoryService } from './services/history.service'
import { HistoryController } from './controllers/history.controller'
import { ExerciseModule } from '../exercise/exercise.module'
import { TokenModule } from '../token/token.module'
import { HistoryOrmProvider } from './providers/history-orm.provider'

@Module({
  imports: [forwardRef(() => ExerciseModule), TokenModule],
  providers: [HistoryService, HistoryOrmProvider],
  exports: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
