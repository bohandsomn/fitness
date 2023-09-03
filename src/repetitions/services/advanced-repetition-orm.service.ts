import { Injectable } from '@nestjs/common'
import { RepetitionOrmService } from './repetition-orm.service'
import { OrmService } from '../../orm/services/orm.service'
import { UserDifficulty } from '../../user/constants/user.const'

@Injectable()
export class AdvancedRepetitionOrmService extends RepetitionOrmService {
    constructor(ormService: OrmService) {
        super(UserDifficulty.ADVANCED, ormService)
    }
}
