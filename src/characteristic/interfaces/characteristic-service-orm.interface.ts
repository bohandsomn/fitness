import { AddCharacteristicDTO } from '../dto/add-characteristic.dto'
import { CharacteristicPreviewDTO } from '../dto/characteristic-preview.dto'
import { CreateCharacteristicDTO } from '../dto/create-characteristic.dto'
import { DeleteCharacteristicDTO } from '../dto/delete-characteristic.dto'
import { GetCharacteristicDTO } from '../dto/get-characteristic.dto'
import { GetCharacteristicsByExerciseDTO } from '../dto/get-characteristics-by-exercise.dto'
import { RemoveCharacteristicDTO } from '../dto/remove-characteristic.dto'
import { UpdateCharacteristicDTO } from '../dto/update-characteristic.dto'

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
