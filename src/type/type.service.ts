import { Injectable } from '@nestjs/common'
import { CharacteristicService } from '../characteristic/characteristic.service'
import { CharacteristicType } from '../characteristic/characteristic.conts'
import { OrmService } from '../orm/orm.service'

@Injectable()
export class TypeService extends CharacteristicService {
    constructor(ormService: OrmService) {
        super(CharacteristicType.TYPE, ormService)
    }
}
