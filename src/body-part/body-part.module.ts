import { Module } from '@nestjs/common'
import { BodyPartController } from './controllers/body-part.controller'
import { TokenModule } from '../token/token.module'
import { BodyPartService } from './services/body-part.service'

@Module({
  imports: [TokenModule],
  controllers: [BodyPartController],
  providers: [BodyPartService],
})
export class BodyPartModule { }
