import { Inject } from '@nestjs/common'
import { HistoryOrmService } from '../services/history-orm.service'

export const InjectHistoryOrm = () => Inject(HistoryOrmService)