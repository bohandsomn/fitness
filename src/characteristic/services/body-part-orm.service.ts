import { Injectable } from '@nestjs/common'
import { CharacteristicOrmService } from './characteristic-orm.service.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CharacteristicType } from '../constants/characteristic.const.js'

@Injectable()
export class BodyPartOrmService extends CharacteristicOrmService {
    constructor(ormService: OrmService) {
        super(CharacteristicType.BODY_PART, ormService)
    }
}
