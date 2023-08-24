import { Module } from '@nestjs/common'
import { RepetitionsService } from './services/repetitions.service'

@Module({
  providers: [RepetitionsService],
  exports: [RepetitionsService],
})
export class RepetitionsModule { }
