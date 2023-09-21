import { Injectable } from '@nestjs/common'
import { CharacteristicOrmService } from './characteristic-orm.service.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CharacteristicType } from '../constants/characteristic.const.js'

@Injectable()
export class TypeOrmService extends CharacteristicOrmService {
    constructor(ormService: OrmService) {
        super(CharacteristicType.TYPE, ormService)
    }
}
