import { Module } from '@nestjs/common'
import { HistoryService } from './history.service'
import { HistoryController } from './history.controller'
import { ExerciseModule } from '../exercise/exercise.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [ExerciseModule, TokenModule],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule { }
