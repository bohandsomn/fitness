import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [forwardRef(() => TokenModule)],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
