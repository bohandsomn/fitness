import { Inject } from '@nestjs/common'
import { UserOrmService } from '../services/user-orm.service'

export const InjectUserOrm = () => Inject(UserOrmService)