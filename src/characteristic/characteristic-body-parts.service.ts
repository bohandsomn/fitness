import { Injectable } from '@nestjs/common'
import { CharacteristicService } from './characteristic.service'
import { CharacteristicType } from './characteristic.conts'
import { OrmService } from '../orm/orm.service'

@Injectable()
export class CharacteristicBodyPartsService extends CharacteristicService {
    constructor(ormService: OrmService) {
        super(CharacteristicType.BODY_PART, ormService)
    }
}
