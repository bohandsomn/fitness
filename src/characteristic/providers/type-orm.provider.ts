import { Provider } from '@nestjs/common'
import { TypeOrmService } from '../services/type-orm.service'

export const TypeOrmProvider: Provider = {
    provide: TypeOrmService,
    useClass: TypeOrmService,
}