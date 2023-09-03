import { Module } from '@nestjs/common'
import { ExerciseController } from './controllers/exercise.controller'
import { ExerciseService } from './services/exercise.service'
import { ImageModule } from '../image/image.module'
import { UserModule } from '../user/user.module'
import { TokenModule } from '../token/token.module'
import { RepetitionsModule } from '../repetitions/repetitions.module'
import { ExerciseOrmProvider } from './providers/exercise-orm.provider'

@Module({
  imports: [ImageModule, UserModule, TokenModule, RepetitionsModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseOrmProvider],
  exports: [ExerciseService],
})
export class ExerciseModule { }
