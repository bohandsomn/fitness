import { Injectable } from '@nestjs/common'
import { ICharacteristicService } from '../../characteristic/interfaces/characteristic-service.interface.js'
import { ICharacteristicOrmService } from '../../characteristic/interfaces/characteristic-service-orm.interface.js'
import { InjectBodyPartOrm } from '../../characteristic/decorators/body-part-orm.decorator.js'
import { CharacteristicPreviewDTO } from '../../characteristic/dto/characteristic-preview.dto.js'
import { CreateCharacteristicDTO } from '../../characteristic/dto/create-characteristic.dto.js'
import { UpdateCharacteristicDTO } from '../../characteristic/dto/update-characteristic.dto.js'
import { GetCharacteristicDTO } from '../../characteristic/dto/get-characteristic.dto.js'
import { GetCharacteristicsByExerciseDTO } from '../../characteristic/dto/get-characteristics-by-exercise.dto.js'
import { DeleteCharacteristicDTO } from '../../characteristic/dto/delete-characteristic.dto.js'
import { AddCharacteristicDTO } from '../../characteristic/dto/add-characteristic.dto.js'
import { RemoveCharacteristicDTO } from '../../characteristic/dto/remove-characteristic.dto.js'

@Injectable()
export class BodyPartService implements ICharacteristicService {
    constructor(
        @InjectBodyPartOrm() private readonly bodyPartOrmService: ICharacteristicOrmService
    ) { }

    async createCharacteristic(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        return this.bodyPartOrmService.create(dto)
    }

    async updateCharacteristic(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        return this.bodyPartOrmService.update(dto)
    }

    async getCharacteristic(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        return this.bodyPartOrmService.getOne(dto)
    }

    async getCharacteristics(): Promise<CharacteristicPreviewDTO[]> {
        return this.bodyPartOrmService.getMany()
    }

    async getCharacteristicsByExercise(dto: GetCharacteristicsByExerciseDTO): Promise<CharacteristicPreviewDTO[]> {
        return this.bodyPartOrmService.getManyByExercise(dto)
    }

    async deleteCharacteristic(dto: DeleteCharacteristicDTO): Promise<void> {
        return this.bodyPartOrmService.delete(dto)
    }

    async addCharacteristic(dto: AddCharacteristicDTO): Promise<void> {
        return this.bodyPartOrmService.add(dto)
    }

    async removeCharacteristic(dto: RemoveCharacteristicDTO): Promise<void> {
        return this.bodyPartOrmService.remove(dto)
    }
}
