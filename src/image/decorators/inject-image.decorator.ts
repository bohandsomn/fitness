import { Inject } from '@nestjs/common'
import { ImageKitService } from '../services/image-kit.service.js'

export const InjectImage = () => Inject(ImageKitService)