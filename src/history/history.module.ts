import { Module, forwardRef } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { ExerciseModule } from '../exercise/exercise.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [forwardRef(() => ExerciseModule), TokenModule],
  providers: [HistoryService],
  exports: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
