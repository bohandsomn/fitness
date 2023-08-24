import { Module, Global } from '@nestjs/common'
import { ColorLoggerService } from './services/color-logger.service'

@Global()
@Module({
  providers: [ColorLoggerService],
  exports: [ColorLoggerService],
})
export class ColorLoggerModule { }
