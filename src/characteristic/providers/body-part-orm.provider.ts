import { Provider } from '@nestjs/common'
import { BodyPartOrmService } from '../services/body-part-orm.service'

export const BodyPartOrmProvider: Provider = {
    provide: BodyPartOrmService,
    useClass: BodyPartOrmService,
}