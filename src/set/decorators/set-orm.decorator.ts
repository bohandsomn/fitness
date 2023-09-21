import { Inject } from '@nestjs/common'
import { SetOrmService } from '../services/set-orm.service.js'

export const InjectSetOrm = () => Inject(SetOrmService)