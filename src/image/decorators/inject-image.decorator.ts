import { Inject } from '@nestjs/common'
import { ImageKitService } from '../services/image-kit.service'

export const InjectImage = () => Inject(ImageKitService)