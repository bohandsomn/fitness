import { Module } from '@nestjs/common'
import { TypeController } from './controllers/type.controller'
import { TypeService } from './services/type.service'
import { TokenModule } from '../token/token.module'
import { TypeOrmProvider } from '../characteristic/providers/type-orm.provider'

@Module({
  imports: [TokenModule],
  controllers: [TypeController],
  providers: [TypeService, TypeOrmProvider],
  exports: [TypeService],
})
export class TypeModule { }
