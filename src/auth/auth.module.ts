import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller.js'
import { AuthService } from './services/auth.service.js'
import { UserModule } from '../user/user.module.js'
import { TokenModule } from '../token/token.module.js'

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
