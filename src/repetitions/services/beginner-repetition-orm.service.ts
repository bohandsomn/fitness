import { Injectable } from '@nestjs/common'
import { RepetitionOrmService } from './repetition-orm.service'
import { OrmService } from '../../orm/services/orm.service'
import { UserDifficulty } from '../../user/constants/user.const'

@Injectable()
export class BeginnerRepetitionOrmService extends RepetitionOrmService {
    constructor(ormService: OrmService) {
        super(UserDifficulty.BEGINNER, ormService)
    }
}
