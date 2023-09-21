import { Provider } from '@nestjs/common'
import { SetOrmService } from '../services/set-orm.service.js'

export const SetOrmProvider: Provider = {
    provide: SetOrmService,
    useClass: SetOrmService,
}