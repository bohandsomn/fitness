import { Injectable } from '@nestjs/common'
import { RepetitionOrmService } from './repetition-orm.service'
import { OrmService } from '../../orm/services/orm.service'
import { UserDifficulty } from '../../user/constants/user.const'

@Injectable()
export class IntermediateRepetitionOrmService extends RepetitionOrmService {
    constructor(ormService: OrmService) {
        super(UserDifficulty.INTERMEDIATE, ormService)
    }
}
