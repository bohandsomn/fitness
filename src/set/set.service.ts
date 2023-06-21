import { Injectable, NotFoundException } from '@nestjs/common'
import { ISetService } from './set-service.interface'
import { GetSetDTO } from './dto/get-set.dto'
import { SetDTO } from './dto/set.dto'
import { GetSetCaloriesDTO } from './dto/get-set-calories.dto'
import { CreateSetDTO } from './dto/create-set.dto'
import { UpdateSetDTO } from './dto/update-set.dto'
import { SetException } from './set.exception'
import { GetSetsDTO } from './dto/get-sets.dto'
import { DeleteSetDTO } from './dto/delete-set.dto'
import { AddExerciseSetDTO } from './dto/add-exercise-set.dto'
import { RemoveExerciseSetDTO } from './dto/remove-exercise-set.dto'
import { OrmService } from '../orm/orm.service'
import { UserService } from '../user/user.service'
import { ExerciseService } from '../exercise/exercise.service'
import { RepetitionsService } from '../repetitions/repetitions.service'
import { UserDifficulty } from '../user/user.const'
import { ImageService } from '../image/image.service'
import { SetPreviewDTO } from './dto/set-preview.dto'
import { IsSetOwnerDTO } from './dto/is-set-owner.dto'
import { GetCommonSetsDTO } from './dto/get-common-sets.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SetService implements ISetService {
    constructor(
        private readonly configService: ConfigService,
        private readonly ormService: OrmService,
        private readonly exerciseService: ExerciseService,
        private readonly imageService: ImageService,
    ) { }

    async createSet(dto: CreateSetDTO): Promise<SetPreviewDTO> {
        const demonstration = await this.imageService.createImage(dto.image)
        const set = await this.ormService.set.create({
            data: {
                name: dto.name,
                description: dto.description,
                demonstration,
                users: {
                    connect: {
                        id: dto.userId
                    }
                }
            },
        })
        const calories = await this.getSetCalories({
            setId: set.id,
            userId: dto.userId,
        })
        return {
            id: set.id,
            name: set.name,
            demonstration: set.demonstration,
            calories,
        }
    }

    async updateSet(dto: UpdateSetDTO): Promise<SetPreviewDTO> {
        const set = await this.getSet(dto)
        const demonstration = dto.image
            ? await this.imageService.updateImage({
                ...dto.image,
                demonstration: set.demonstration
            })
            : undefined
        await this.ormService.set.update({
            where: {
                id: set.id
            },
            data: {
                name: dto.name || set.name,
                description: dto.description || set.description,
                demonstration: demonstration || set.demonstration
            }
        })
        const updatedSet = await this.getSet({
            id: set.id,
            userId: dto.userId
        })
        return {
            id: updatedSet.id,
            name: updatedSet.name,
            demonstration: updatedSet.demonstration,
            calories: updatedSet.calories,
        }
    }

    async getSet(dto: GetSetDTO): Promise<SetDTO> {
        const set = await this.querySet(dto)
        if (!set) {
            throw new NotFoundException(SetException.NOT_FOUND)
        }
        return set
    }

    async getSets(dto: GetSetsDTO): Promise<SetPreviewDTO[]> {
        const sets = await this.ormService.set.findMany({
            where: {
                users: {
                    every: {
                        id: dto.userId
                    }
                }
            }
        })
        return Promise.all(
            sets.map(async (set) => {
                const calories = await this.getSetCalories({
                    setId: set.id,
                    userId: dto.userId
                })
                return {
                    id: set.id,
                    name: set.name,
                    demonstration: set.demonstration,
                    calories,
                }
            })
        )
    }

    async deleteSet(dto: DeleteSetDTO): Promise<void> {
        await this.ormService.set.delete({
            where: {
                id: dto.id,
            }
        })
    }

    async addExerciseSet(dto: AddExerciseSetDTO): Promise<void> {
        await this.ormService.set.update({
            where: {
                id: dto.setId
            },
            data: {
                exercises: {
                    connect: {
                        id: dto.exerciseId
                    }
                }
            }
        })
    }

    async removeExerciseSet(dto: RemoveExerciseSetDTO): Promise<void> {
        await this.ormService.set.update({
            where: {
                id: dto.setId
            },
            data: {
                exercises: {
                    disconnect: {
                        id: dto.exerciseId
                    }
                }
            }
        })
    }

    async isSetOwner(dto: IsSetOwnerDTO): Promise<boolean> {
        const set = await this.ormService.set.findFirst({
            where: {
                id: dto.setId,
                users: {
                    every: {
                        id: dto.userId,
                    }
                }
            }
        })
        const isSetOwner = set !== null
        return isSetOwner
    }

    async getSetCalories(dto: GetSetCaloriesDTO): Promise<number> {
        const exercises = await this.exerciseService.getManyExercises({ setId: dto.setId, userId: dto.userId })
        const calories = exercises.reduce((calories, exercise) => calories + exercise.calories, 0)
        return calories
    }

    async getCommonSets(dto: GetCommonSetsDTO): Promise<SetPreviewDTO[]> {
        const commonSetIds = this.configService.getOrThrow<string>('COMMON_SET_IDS')
        const ids = commonSetIds.split(',').map(Number)
        const sets = (await Promise.all(
            ids.map((id) => this.querySet({ id, userId: dto.userId }))
        )).filter((set): set is SetDTO => set !== null)
        return sets
    }

    private async querySet(dto: GetSetDTO): Promise<SetDTO | null> {
        const set = await this.ormService.set.findFirst({
            where: {
                id: dto.id,
            }
        })
        if (!set) {
            return null
        }
        const calories = await this.getSetCalories({
            setId: set.id,
            userId: dto.userId,
        })
        return {
            ...set,
            calories
        }
    }
}
