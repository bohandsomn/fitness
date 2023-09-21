import { Inject } from '@nestjs/common'
import { HistoryOrmService } from '../services/history-orm.service.js'

export const InjectHistoryOrm = () => Inject(HistoryOrmService)