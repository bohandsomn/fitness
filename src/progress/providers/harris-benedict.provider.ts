import { Provider } from '@nestjs/common'
import { HarrisBenedictService } from '../services/harris–benedict.service.js'

export const HarrisBenedictProvider: Provider = {
    provide: HarrisBenedictService,
    useClass: HarrisBenedictService,
}