import { Module, forwardRef } from '@nestjs/common'
import { HistoryService } from './services/history.service'
import { HistoryController } from './controllers/history.controller'
import { ExerciseModule } from '../exercise/exercise.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [forwardRef(() => ExerciseModule), TokenModule],
  providers: [HistoryService],
  exports: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
