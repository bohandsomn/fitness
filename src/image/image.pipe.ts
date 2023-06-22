import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { ImageDTO } from './dto/image.dto'

@Injectable()
export class ImagePipe implements PipeTransform<Express.Multer.File, ImageDTO | undefined> {
    transform(value: Express.Multer.File | undefined, metadata: ArgumentMetadata): ImageDTO | undefined {
        if (!value) {
            return
        }
        const file = value.buffer
        const [, extension] = value.originalname.split('.')
        return {
            file,
            extension,
        }
    }
}
