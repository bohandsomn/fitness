import { Module } from '@nestjs/common'
import { TypeController } from './controllers/type.controller'
import { TypeService } from './services/type.service'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [TokenModule],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule { }
