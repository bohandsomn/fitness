import { Injectable } from '@nestjs/common'
import { CharacteristicService } from '../../characteristic/services/characteristic.service'
import { CharacteristicType } from '../../characteristic/constants/characteristic.conts'
import { OrmService } from '../../orm/services/orm.service'

@Injectable()
export class TypeService extends CharacteristicService {
    constructor(ormService: OrmService) {
        super(CharacteristicType.TYPE, ormService)
    }
}
