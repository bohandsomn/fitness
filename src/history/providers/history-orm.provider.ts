import { Provider } from '@nestjs/common'
import { HistoryOrmService } from '../services/history-orm.service.js'

export const HistoryOrmProvider: Provider = {
    provide: HistoryOrmService,
    useClass: HistoryOrmService,
}