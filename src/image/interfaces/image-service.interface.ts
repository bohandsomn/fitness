import { DeleteImageDTO } from '../dto/delete-image.dto'
import { GetImageDTO } from '../dto/get-image.dto'
import { CreateImageDTO } from '../dto/create-image.dto'
import { UpdateImageDTO } from '../dto/update-image.dto'

export interface IImageService {
    create(dto: CreateImageDTO): Promise<string>
    update(dto: UpdateImageDTO): Promise<string>
    get(dto: GetImageDTO): Promise<Buffer>
    delete(dto: DeleteImageDTO): Promise<void>
}
