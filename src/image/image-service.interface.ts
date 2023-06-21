import { DeleteImageDTO } from './dto/delete-image.dto'
import { GetUrlDTO } from './dto/get-url.dto'
import { CreateImageDTO } from './dto/create-image.dto'
import { UpdateImageDTO } from './dto/update-image.dto'
import { GetBufferDTO } from './dto/get-buffer.dto'

export interface IImageService {
    createImage(dto: CreateImageDTO): Promise<string>
    updateImage(dto: UpdateImageDTO): Promise<string>
    getUrl(dto: GetUrlDTO): Promise<string>
    getBuffer(dto: GetBufferDTO): Promise<Buffer>
    deleteImage(dto: DeleteImageDTO): Promise<void>
}
