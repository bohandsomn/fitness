import { Module } from '@nestjs/common'
import { SetService } from './services/set.service.js'
import { SetController } from './controllers/set.controller.js'
import { ExerciseModule } from '../exercise/exercise.module.js'
import { ImageModule } from '../image/image.module.js'
import { TokenModule } from '../token/token.module.js'
import { SetOrmProvider } from './providers/set-orm.provider.js'

@Module({
  imports: [
    ExerciseModule,
    ImageModule,
    TokenModule,
  ],
  providers: [SetService, SetOrmProvider],
  exports: [SetService],
  controllers: [SetController],
})
export class SetModule { }
