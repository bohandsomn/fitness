import { Module, Global } from '@nestjs/common'
import { DateService } from './services/date.service.js'

@Global()
@Module({
  providers: [DateService],
  exports: [DateService],
})
export class DateModule { }
