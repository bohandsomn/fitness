import { AddCharacteristicDTO } from './dto/add-characteristic.dto'
import { CharacteristicPreviewDTO } from './dto/characteristic-preview.dto'
import { CreateCharacteristicDTO } from './dto/create-characteristic.dto'
import { DeleteCharacteristicDTO } from './dto/delete-characteristic.dto'
import { GetCharacteristicDTO } from './dto/get-characteristic.dto'
import { GetCharacteristicsDTO } from './dto/get-characteristics.dto'
import { RemoveCharacteristicDTO } from './dto/remove-characteristic.dto'
import { UpdateCharacteristicDTO } from './dto/update-characteristic.dto'

export interface ICharacteristicService {
    createCharacteristic(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    updateCharacteristic(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getCharacteristic(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO>
    getCharacteristics(dto: GetCharacteristicsDTO): Promise<CharacteristicPreviewDTO[]>
    deleteCharacteristic(dto: DeleteCharacteristicDTO): Promise<void>
    addCharacteristic(dto: AddCharacteristicDTO): Promise<void>
    removeCharacteristic(dto: RemoveCharacteristicDTO): Promise<void>
}
