import { Module } from '@nestjs/common'
import { RepetitionsService } from './repetitions.service'

@Module({
  providers: [RepetitionsService],
  exports: [RepetitionsService],
})
export class RepetitionsModule { }
