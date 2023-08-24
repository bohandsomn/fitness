import { Module, forwardRef } from '@nestjs/common'
import { TokenService } from './services/token.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule { }
