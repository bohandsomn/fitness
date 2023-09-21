import { Inject } from '@nestjs/common'
import { UserOrmService } from '../services/user-orm.service.js'

export const InjectUserOrm = () => Inject(UserOrmService)