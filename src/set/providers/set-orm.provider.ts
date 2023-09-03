import { Provider } from '@nestjs/common'
import { SetOrmService } from '../services/set-orm.service'

export const SetOrmProvider: Provider = {
    provide: SetOrmService,
    useClass: SetOrmService,
}