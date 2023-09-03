import { Inject } from '@nestjs/common'
import { BodyPartOrmService } from '../services/body-part-orm.service'

export const InjectBodyPartOrm = () => Inject(BodyPartOrmService)