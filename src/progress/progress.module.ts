import { Module, forwardRef } from '@nestjs/common'
import { ProgressController } from './progress.controller'
import { ProgressService } from './progress.service'
import { HarrisBenedictService } from './harris–benedict/harris–benedict.service'
import { UserModule } from '../user/user.module'
import { HistoryModule } from '../history/history.module'
import { TokenModule } from '../token/token.module'

@Module({
  imports: [forwardRef(() => UserModule), HistoryModule, TokenModule],
  controllers: [ProgressController],
  providers: [ProgressService, HarrisBenedictService],
  exports: [ProgressService]
})
export class ProgressModule { }
