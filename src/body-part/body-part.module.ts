import { Module } from '@nestjs/common'
import { BodyPartController } from './controllers/body-part.controller'
import { TokenModule } from '../token/token.module'
import { BodyPartService } from './services/body-part.service'
import { BodyPartOrmProvider } from '../characteristic/providers/body-part-orm.provider'

@Module({
  imports: [TokenModule],
  controllers: [BodyPartController],
  providers: [BodyPartService, BodyPartOrmProvider],
})
export class BodyPartModule { }
