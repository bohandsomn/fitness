import { ICharacteristicService } from './characteristic-service.interface'
import { OrmService } from '../orm/orm.service'
import { CharacteristicPreviewDTO } from './dto/characteristic-preview.dto'
import { CreateCharacteristicDTO } from './dto/create-characteristic.dto'
import { CharacteristicType } from './characteristic.conts'
import { GetCharacteristicDTO } from './dto/get-characteristic.dto'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { CharacteristicException } from './characteristic.exception'
import { UpdateCharacteristicDTO } from './dto/update-characteristic.dto'
import { GetCharacteristicsDTO } from './dto/get-characteristics.dto'
import { DeleteCharacteristicDTO } from './dto/delete-characteristic.dto'
import { AddCharacteristicDTO } from './dto/add-characteristic.dto'
import { RemoveCharacteristicDTO } from './dto/remove-characteristic.dto'

export abstract class CharacteristicService implements ICharacteristicService {
    constructor(
        private readonly characteristicType: CharacteristicType,
        private readonly ormService: OrmService,
    ) { }

    async createCharacteristic(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        const candidate = await this.queryCharacteristic(dto)
        if (candidate) {
            throw new ConflictException(CharacteristicException.ALREADY_EXISTS)
        }
        const characteristic: CharacteristicPreviewDTO = await (this.ormService[this.characteristicType].create as any)({
            data: {
                value: dto.value,
            }
        })
        return characteristic
    }

    async updateCharacteristic(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        const characteristic: CharacteristicPreviewDTO = await (this.ormService[this.characteristicType].update as any)({
            where: {
                id: dto.id,
            },
            data: {
                value: dto.value,
            }
        })
        return characteristic
    }

    async getCharacteristic(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        const characteristic = await this.queryCharacteristic(dto)
        if (!characteristic) {
            throw new NotFoundException(CharacteristicException.NOT_FOUND)
        }
        return characteristic
    }

    async getCharacteristics(dto: GetCharacteristicsDTO): Promise<CharacteristicPreviewDTO[]> {
        const characteristics = await this.ormService[this.characteristicType].findMany({
            where: {
                exercises: {
                    every: {
                        id: dto.exerciseId,
                    }
                }
            }
        })
        return characteristics
    }

    async deleteCharacteristic(dto: DeleteCharacteristicDTO): Promise<void> {
        await this.ormService[this.characteristicType].delete({
            where: {
                id: dto.id,
            }
        })
    }

    async addCharacteristic(dto: AddCharacteristicDTO): Promise<void> {
        await this.ormService.exercise.update({
            where: {
                id: dto.exerciseId
            },
            data: {
                [this.characteristicType]: {
                    connect: {
                        id: dto.characteristicId
                    }
                }
            }
        })
    }

    async removeCharacteristic(dto: RemoveCharacteristicDTO): Promise<void> {
        await this.ormService.exercise.update({
            where: {
                id: dto.exerciseId
            },
            data: {
                [this.characteristicType]: {
                    disconnect: {
                        id: dto.characteristicId
                    }
                }
            }
        })
    }

    private async queryCharacteristic(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO | null> {
        const characteristic = await this.ormService[this.characteristicType].findFirst({
            where: {
                OR: {
                    id: dto.id,
                    value: dto.value,
                }
            }
        })
        return characteristic
    }
}
