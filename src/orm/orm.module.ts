import { Module, Global } from '@nestjs/common'
import { OrmService } from './services/orm.service'

@Global()
@Module({
  providers: [OrmService],
  exports: [OrmService]
})
export class OrmModule { }
