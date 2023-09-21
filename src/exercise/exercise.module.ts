import { Module } from '@nestjs/common'
import { ExerciseController } from './controllers/exercise.controller.js'
import { ImageModule } from '../image/image.module.js'
import { UserModule } from '../user/user.module.js'
import { TokenModule } from '../token/token.module.js'
import { RepetitionsModule } from '../repetitions/repetitions.module.js'
import { ExerciseOrmProvider } from './providers/exercise-orm.provider.js'
import { ExerciseProvider } from './providers/exercise.provider.js'

@Module({
  imports: [ImageModule, UserModule, TokenModule, RepetitionsModule],
  controllers: [ExerciseController],
  providers: [ExerciseProvider, ExerciseOrmProvider],
  exports: [ExerciseProvider],
})
export class ExerciseModule { }
