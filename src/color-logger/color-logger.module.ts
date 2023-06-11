import { Module } from '@nestjs/common';
import { ColorLoggerService } from './color-logger.service';

@Module({
  providers: [ColorLoggerService]
})
export class ColorLoggerModule {}
