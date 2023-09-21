import { Injectable } from '@nestjs/common'
import { RepetitionOrmService } from './repetition-orm.service.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { UserDifficulty } from '../../user/constants/user.const.js'

@Injectable()
export class AdvancedRepetitionOrmService extends RepetitionOrmService {
    constructor(ormService: OrmService) {
        super(UserDifficulty.ADVANCED, ormService)
    }
}
