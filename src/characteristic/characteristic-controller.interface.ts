import { CharacteristicPreviewDTO } from './dto/characteristic-preview.dto'
import { CreateCharacteristicDTO } from './dto/create-characteristic.dto'
import { UpdateCharacteristicDTO } from './dto/update-characteristic.dto'

export interface ICharacteristicController {
    createCharacteristic(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    updateCharacteristic(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getCharacteristic(id?: number, value?: string): Promise<CharacteristicPreviewDTO>
    getCharacteristics(exerciseId: number): Promise<CharacteristicPreviewDTO[]>
    deleteCharacteristic(id: number): Promise<void>
    addCharacteristic(characteristicId: number, exerciseId: number): Promise<void>
    removeCharacteristic(characteristicId: number, exerciseId: number): Promise<void>
}
