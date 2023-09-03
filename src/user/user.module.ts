import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { TokenModule } from '../token/token.module'
import { ProgressModule } from '../progress/progress.module'
import { UserOrmProvider } from './providers/user-orm.provider'

@Module({
  imports: [forwardRef(() => TokenModule), forwardRef(() => ProgressModule)],
  providers: [UserService, UserOrmProvider],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
