import { Module, Global } from '@nestjs/common'
import { CommonService } from './services/common.service.js'

@Global()
@Module({
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule { }
