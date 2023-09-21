import { Inject } from '@nestjs/common'
import { TypeOrmService } from '../services/type-orm.service.js'

export const InjectTypeOrm = () => Inject(TypeOrmService)