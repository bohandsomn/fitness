import { Module, forwardRef } from '@nestjs/common'
import { TokenService } from './services/token.service.js'
import { UserModule } from '../user/user.module.js'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule { }
