import { Inject } from '@nestjs/common'
import { SetOrmService } from '../services/set-orm.service'

export const InjectSetOrm = () => Inject(SetOrmService)