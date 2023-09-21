import { CharacteristicPreviewDTO } from '../dto/characteristic-preview.dto.js'
import { CreateCharacteristicDTO } from '../dto/create-characteristic.dto.js'
import { UpdateCharacteristicDTO } from '../dto/update-characteristic.dto.js'

export interface ICharacteristicController {
    createCharacteristic(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    updateCharacteristic(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getCharacteristic(id: number): Promise<CharacteristicPreviewDTO>
    getCharacteristicsByExercise(exerciseId: number): Promise<CharacteristicPreviewDTO[]>
    getCharacteristics(): Promise<CharacteristicPreviewDTO[]>
    deleteCharacteristic(id: number): Promise<void>
    addCharacteristic(characteristicId: number, exerciseId: number): Promise<void>
    removeCharacteristic(characteristicId: number, exerciseId: number): Promise<void>
}
