import { Module, forwardRef } from '@nestjs/common'
import { UserController } from './controllers/user.controller.js'
import { TokenModule } from '../token/token.module.js'
import { ProgressModule } from '../progress/progress.module.js'
import { UserOrmProvider } from './providers/user-orm.provider.js'
import { UserProvider } from './providers/user.provider.js'

@Module({
  imports: [forwardRef(() => TokenModule), forwardRef(() => ProgressModule)],
  providers: [UserProvider, UserOrmProvider],
  exports: [UserProvider],
  controllers: [UserController],
})
export class UserModule { }
