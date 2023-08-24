import { Module, forwardRef } from '@nestjs/common'
import { ProgressController } from './controllers/progress.controller'
import { ProgressService } from './services/progress.service'
import { UserModule } from '../user/user.module'
import { HistoryModule } from '../history/history.module'
import { TokenModule } from '../token/token.module'
import { HarrisBenedictProvider } from './providers/harris-benedict.provider'

@Module({
  imports: [forwardRef(() => UserModule), HistoryModule, TokenModule],
  controllers: [ProgressController],
  providers: [ProgressService, HarrisBenedictProvider],
  exports: [ProgressService]
})
export class ProgressModule { }
