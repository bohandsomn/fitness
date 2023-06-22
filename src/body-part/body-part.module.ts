import { Module } from '@nestjs/common'
import { BodyPartController } from './body-part.controller'
import { BodyPartService } from './body-part.service'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [TokenModule],
  controllers: [BodyPartController],
  providers: [BodyPartService]
})
export class BodyPartModule { }
