import { Inject } from '@nestjs/common'
import { BodyPartOrmService } from '../services/body-part-orm.service.js'

export const InjectBodyPartOrm = () => Inject(BodyPartOrmService)