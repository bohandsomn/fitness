import { Module } from '@nestjs/common'
import { TypeController } from './controllers/type.controller.js'
import { TypeService } from './services/type.service.js'
import { TokenModule } from '../token/token.module.js'
import { TypeOrmProvider } from '../characteristic/providers/type-orm.provider.js'

@Module({
  imports: [TokenModule],
  controllers: [TypeController],
  providers: [TypeService, TypeOrmProvider],
  exports: [TypeService],
})
export class TypeModule { }
