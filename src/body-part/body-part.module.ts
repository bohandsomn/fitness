import { Module } from '@nestjs/common'
import { BodyPartController } from './controllers/body-part.controller.js'
import { TokenModule } from '../token/token.module.js'
import { BodyPartService } from './services/body-part.service.js'
import { BodyPartOrmProvider } from '../characteristic/providers/body-part-orm.provider.js'

@Module({
  imports: [TokenModule],
  controllers: [BodyPartController],
  providers: [BodyPartService, BodyPartOrmProvider],
})
export class BodyPartModule { }
