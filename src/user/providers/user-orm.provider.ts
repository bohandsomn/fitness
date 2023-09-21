import { Provider } from '@nestjs/common'
import { UserOrmService } from '../services/user-orm.service.js'

export const UserOrmProvider: Provider = {
    provide: UserOrmService,
    useClass: UserOrmService,
}