import { AddCharacteristicDTO } from '../dto/add-characteristic.dto.js'
import { CharacteristicPreviewDTO } from '../dto/characteristic-preview.dto.js'
import { CreateCharacteristicDTO } from '../dto/create-characteristic.dto.js'
import { DeleteCharacteristicDTO } from '../dto/delete-characteristic.dto.js'
import { GetCharacteristicDTO } from '../dto/get-characteristic.dto.js'
import { GetCharacteristicsByExerciseDTO } from '../dto/get-characteristics-by-exercise.dto.js'
import { RemoveCharacteristicDTO } from '../dto/remove-characteristic.dto.js'
import { UpdateCharacteristicDTO } from '../dto/update-characteristic.dto.js'

export interface ICharacteristicService {
    createCharacteristic(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    updateCharacteristic(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getCharacteristic(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getCharacteristicsByExercise(dto: GetCharacteristicsByExerciseDTO): Promise<CharacteristicPreviewDTO[]>
    getCharacteristics(): Promise<CharacteristicPreviewDTO[]>
    deleteCharacteristic(dto: DeleteCharacteristicDTO): Promise<void>
    addCharacteristic(dto: AddCharacteristicDTO): Promise<void>
    removeCharacteristic(dto: RemoveCharacteristicDTO): Promise<void>
}
