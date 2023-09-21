import { DeleteImageDTO } from '../dto/delete-image.dto.js'
import { GetImageDTO } from '../dto/get-image.dto.js'
import { CreateImageDTO } from '../dto/create-image.dto.js'
import { UpdateImageDTO } from '../dto/update-image.dto.js'

export interface IImageService {
    create(dto: CreateImageDTO): Promise<string>
    update(dto: UpdateImageDTO): Promise<string>
    get(dto: GetImageDTO): Promise<Buffer>
    delete(dto: DeleteImageDTO): Promise<void>
}
