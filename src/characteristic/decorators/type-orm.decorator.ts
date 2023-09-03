import { Inject } from '@nestjs/common'
import { TypeOrmService } from '../services/type-orm.service'

export const InjectTypeOrm = () => Inject(TypeOrmService)