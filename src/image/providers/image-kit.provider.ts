import { Provider } from '@nestjs/common'
import { ImageKitService } from '../services/image-kit.service.js'

export const ImageKitProvider: Provider = {
    provide: ImageKitService,
    useClass: ImageKitService,
}