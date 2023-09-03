import { Injectable } from '@nestjs/common'
import { CharacteristicOrmService } from './characteristic-orm.service'
import { OrmService } from '../../orm/services/orm.service'
import { CharacteristicType } from '../constants/characteristic.const'

@Injectable()
export class BodyPartOrmService extends CharacteristicOrmService {
    constructor(ormService: OrmService) {
        super(CharacteristicType.BODY_PART, ormService)
    }
}
