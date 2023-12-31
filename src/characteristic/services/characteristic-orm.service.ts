import { ConflictException, NotFoundException } from '@nestjs/common'
import { ICharacteristicOrmService } from '../interfaces/characteristic-service-orm.interface.js'
import { CharacteristicType } from '../constants/characteristic.const.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CreateCharacteristicDTO } from '../dto/create-characteristic.dto.js'
import { CharacteristicPreviewDTO } from '../dto/characteristic-preview.dto.js'
import { CharacteristicException } from '../constants/characteristic.exception.js'
import { UpdateCharacteristicDTO } from '../dto/update-characteristic.dto.js'
import { GetCharacteristicDTO } from '../dto/get-characteristic.dto.js'
import { GetCharacteristicsByExerciseDTO } from '../dto/get-characteristics-by-exercise.dto.js'
import { DeleteCharacteristicDTO } from '../dto/delete-characteristic.dto.js'
import { AddCharacteristicDTO } from '../dto/add-characteristic.dto.js'
import { RemoveCharacteristicDTO } from '../dto/remove-characteristic.dto.js'

export abstract class CharacteristicOrmService implements ICharacteristicOrmService {
    constructor(
        private readonly characteristicType: CharacteristicType,
        private readonly ormService: OrmService,
    ) { }

    async create(dto: CreateCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        const candidate = await this.queryOne(dto)
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

    async update(dto: UpdateCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
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

    async getOne(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO> {
        const characteristic = await this.queryOne(dto)
        if (!characteristic) {
            throw new NotFoundException(CharacteristicException.NOT_FOUND)
        }
        return characteristic
    }

    async getManyByExercise(dto: GetCharacteristicsByExerciseDTO): Promise<CharacteristicPreviewDTO[]> {
        const characteristics = await this.ormService
            .exercise
            .findUnique({
                where: {
                    id: dto.exerciseId
                }
            })
        [this.characteristicType]() || []
        return characteristics
    }

    async getMany(): Promise<CharacteristicPreviewDTO[]> {
        const characteristics = await this.ormService[this.characteristicType].findMany()
        return characteristics
    }

    async delete(dto: DeleteCharacteristicDTO): Promise<void> {
        await this.ormService[this.characteristicType].delete({
            where: {
                id: dto.id,
            }
        })
    }

    async add(dto: AddCharacteristicDTO): Promise<void> {
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

    async remove(dto: RemoveCharacteristicDTO): Promise<void> {
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

    private async queryOne(dto: GetCharacteristicDTO): Promise<CharacteristicPreviewDTO | null> {
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
