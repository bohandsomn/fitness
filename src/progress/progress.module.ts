import { Module, forwardRef } from '@nestjs/common'
import { ProgressController } from './controllers/progress.controller.js'
import { ProgressService } from './services/progress.service.js'
import { UserModule } from '../user/user.module.js'
import { HistoryModule } from '../history/history.module.js'
import { TokenModule } from '../token/token.module.js'
import { HarrisBenedictProvider } from './providers/harris-benedict.provider.js'

@Module({
  imports: [forwardRef(() => UserModule), HistoryModule, TokenModule],
  controllers: [ProgressController],
  providers: [ProgressService, HarrisBenedictProvider],
  exports: [ProgressService]
})
export class ProgressModule { }
