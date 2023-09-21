import { AddCharacteristicDTO } from '../dto/add-characteristic.dto.js'
import { CharacteristicPreviewDTO } from '../dto/characteristic-preview.dto.js'
import { CreateCharacteristicDTO } from '../dto/create-characteristic.dto.js'
import { DeleteCharacteristicDTO } from '../dto/delete-characteristic.dto.js'
import { GetCharacteristicDTO } from '../dto/get-characteristic.dto.js'
import { GetCharacteristicsByExerciseDTO } from '../dto/get-characteristics-by-exercise.dto.js'
import { RemoveCharacteristicDTO } from '../dto/remove-characteristic.dto.js'
import { UpdateCharacteristicDTO } from '../dto/update-characteristic.dto.js'

export interface ICharacteristicOrmService {
    create(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    update(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getOne(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getManyByExercise(dto: GetCharacteristicsByExerciseDTO): Promise<CharacteristicPreviewDTO[]>
    getMany(): Promise<CharacteristicPreviewDTO[]>
    delete(dto: DeleteCharacteristicDTO): Promise<void>
    add(dto: AddCharacteristicDTO): Promise<void>
    remove(dto: RemoveCharacteristicDTO): Promise<void>
}
