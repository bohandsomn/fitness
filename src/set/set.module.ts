import { Module } from '@nestjs/common'
import { SetService } from './services/set.service'
import { SetController } from './controllers/set.controller'
import { ExerciseModule } from '../exercise/exercise.module'
import { ImageModule } from '../image/image.module'
import { TokenModule } from 'src/token/token.module'

@Module({
  imports: [
    ExerciseModule,
    ImageModule,
    TokenModule,
  ],
  providers: [SetService],
  exports: [SetService],
  controllers: [SetController],
})
export class SetModule { }
