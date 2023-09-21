import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ISetService } from '../interfaces/set-service.interface.js'
import { GetSetDTO } from '../dto/get-set.dto.js'
import { SetDTO } from '../dto/set.dto.js'
import { GetSetCaloriesDTO } from '../dto/get-set-calories.dto.js'
import { CreateSetDTO } from '../dto/create-set.dto.js'
import { UpdateSetDTO } from '../dto/update-set.dto.js'
import { SetException } from '../constants/set.exception.js'
import { GetSetsDTO } from '../dto/get-sets.dto.js'
import { DeleteSetDTO } from '../dto/delete-set.dto.js'
import { AddExerciseSetDTO } from '../dto/add-exercise-set.dto.js'
import { RemoveExerciseSetDTO } from '../dto/remove-exercise-set.dto.js'
import { ExerciseService } from '../../exercise/services/exercise.service.js'
import { SetPreviewDTO } from '../dto/set-preview.dto.js'
import { IsSetOwnerDTO } from '../dto/is-set-owner.dto.js'
import { GetCommonSetsDTO } from '../dto/get-common-sets.dto.js'
import { Environment } from '../../common/constants/environment.js'
import { IImageService } from '../../image/interfaces/image-service.interface.js'
import { InjectImage } from '../../image/decorators/inject-image.decorator.js'
import { RoleException } from '../../role/constants/role.exception.js'
import { InjectSetOrm } from '../decorators/set-orm.decorator.js'
import { ISetOrmService } from '../interfaces/set-orm-service.interface.js'

@Injectable()
export class SetService implements ISetService {
    constructor(
        @InjectImage() private readonly imageService: IImageService,
        @InjectSetOrm() private readonly setOrmService: ISetOrmService,
        private readonly configService: ConfigService,
        private readonly exerciseService: ExerciseService,
    ) { }

    async createSet(dto: CreateSetDTO): Promise<SetPreviewDTO> {
        const demonstration = await this.imageService.create(dto.image)
        const set = await this.setOrmService.create({
            name: dto.name,
            description: dto.description,
            demonstration,
            userId: dto.userId
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
        const isSetOwner = await this.isSetOwner({
            setId: dto.id,
            userId: dto.userId,
        })
        if (!isSetOwner) {
            throw new ForbiddenException(RoleException.USER_IS_NOW_SET_OWNER)
        }
        const set = await this.getSet(dto)
        const demonstration = dto.image
            ? await this.imageService.update({
                ...dto.image,
                demonstration: set.demonstration
            })
            : undefined
        await this.setOrmService.update({
            id: set.id,
            name: dto.name || set.name,
            description: dto.description || set.description,
            demonstration: demonstration || set.demonstration,
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
        const sets = await this.setOrmService.getMany({
            userId: dto.userId
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
        const isSetOwner = await this.isSetOwner({
            setId: dto.id,
            userId: dto.userId,
        })
        if (!isSetOwner) {
            throw new ForbiddenException(RoleException.USER_IS_NOW_SET_OWNER)
        }
        const set = await this.setOrmService.queryOne(dto)
        if (!set) {
            return
        }
        await this.setOrmService.delete({
            id: dto.id,
        })
        await this.imageService.delete({
            demonstration: set.demonstration,
        })
    }

    async addExerciseSet(dto: AddExerciseSetDTO): Promise<void> {
        await this.setOrmService.add({
            setId: dto.setId,
            exerciseId: dto.exerciseId,
        })
    }

    async removeExerciseSet(dto: RemoveExerciseSetDTO): Promise<void> {
        await this.setOrmService.remove({
            setId: dto.setId,
            exerciseId: dto.exerciseId,
        })
    }

    async isSetOwner(dto: IsSetOwnerDTO): Promise<boolean> {
        const set = await this.setOrmService.queryOne({
            id: dto.setId,
            userId: dto.userId,
        })
        const isSetOwner = set !== null
        return isSetOwner
    }

    async getSetCalories(dto: GetSetCaloriesDTO): Promise<number> {
        const exercises = await this.exerciseService.getManyExercises({
            setId: dto.setId,
            userId: dto.userId
        })
        const calories = exercises.reduce((calories, exercise) => {
            return calories + exercise.calories
        }, 0)
        return calories
    }

    async getCommonSets(dto: GetCommonSetsDTO): Promise<SetPreviewDTO[]> {
        const commonSetIds = this.configService.getOrThrow<string>(
            Environment.COMMON_SET_IDS
        )
        const ids = commonSetIds.split(',').map(Number)
        const sets = (await Promise.all(
            ids.map((id) => this.querySet({ id, userId: dto.userId }))
        )).filter((set): set is SetDTO => set !== null)
        return sets
    }

    private async querySet(dto: GetSetDTO): Promise<SetDTO | null> {
        const set = await this.setOrmService.queryOne({
            id: dto.id,
        })
        if (!set) {
            return null
        }
        const calories = await this.getSetCalories({
            setId: set.id,
            userId: dto.userId,
        })
        const isOwner = await this.isSetOwner({
            setId: set.id,
            userId: dto.userId,
        })
        return {
            ...set,
            calories,
            isOwner,
        }
    }
}
