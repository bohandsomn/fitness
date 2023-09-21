import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateExerciseDTO } from '../dto/create-exercise.dto.js'
import { IExerciseService } from '../interfaces/exercise-service.interface.js'
import { ExercisePayloadDTO } from '../dto/exercise-payload.dto.js'
import { UpdateExerciseDTO } from '../dto/update-exercise.dto.js'
import { GetOneExerciseDTO } from '../dto/get-one-exercise.dto.js'
import { ExerciseException } from '../constants/exercise.exception.js'
import { GetManyExercisesDTO } from '../dto/get-many-exercises.dto.js'
import { DeleteExerciseDTO } from '../dto/delete-exercise.dto.js'
import { ExerciseDTO } from '../dto/exercise.dto.js'
import { UserService } from '../../user/services/user.service.js'
import { RepetitionsService } from '../../repetitions/services/repetitions.service.js'
import { GetExerciseCaloriesDTO } from '../dto/get-exercise-calories.dto.js'
import { UserDifficulty } from '../../user/constants/user.const.js'
import { InjectImage } from '../../image/decorators/inject-image.decorator.js'
import { IImageService } from '../../image/interfaces/image-service.interface.js'
import { InjectExerciseOrm } from '../decorators/exercise-orm.decorator.js'
import { IExerciseOrmService } from '../interfaces/exercise-orm-service.interface.js'
import { AppException } from '../../constants/app.exception.js'

@Injectable()
export class ExerciseService implements IExerciseService {
    constructor(
        @InjectImage() private readonly imageService: IImageService,
        @InjectExerciseOrm() private readonly exerciseOrmService: IExerciseOrmService,
        private readonly userService: UserService,
        private readonly repetitionsService: RepetitionsService
    ) { }

    async createExercise(dto: CreateExerciseDTO): Promise<ExercisePayloadDTO> {
        const demonstration = await this.imageService.create(dto.image)
        const exercise = await this.exerciseOrmService.create({
            calories: dto.calories,
            header: dto.header,
            description: dto.description,
            demonstration,
        })
        await this.repetitionsService.createRepetitions({
            exerciseId: exercise.id,
            ...dto,
        })
        return this.adaptExercise(exercise)
    }

    async updateExercise(dto: UpdateExerciseDTO): Promise<ExercisePayloadDTO> {
        const exercise = await this.getOneExercise(dto)
        const demonstration = dto.image
            ? await this.imageService.update({
                ...dto.image,
                demonstration: exercise.demonstration,
            })
            : undefined
        await this.repetitionsService.updateRepetitions({
            exerciseId: exercise.id,
            ...dto
        })
        return this.exerciseOrmService.update({
            id: exercise.id,
            calories: dto.calories,
            header: dto.header,
            description: dto.description,
            demonstration: demonstration,
        })
    }

    async getOneExercise(dto: GetOneExerciseDTO): Promise<ExerciseDTO> {
        const exercise = await this.queryExercise(dto)
        if (!exercise) {
            throw new NotFoundException(ExerciseException.NOT_FOUND)
        }
        return exercise
    }

    async getManyExercises(dto: GetManyExercisesDTO): Promise<ExercisePayloadDTO[]> {
        const exercises = await this.exerciseOrmService.getMany({
            setId: dto.setId,
            header: dto.header,
            caloriesFrom: dto.caloriesFrom,
            caloriesTo: dto.caloriesTo,
            type: dto.type,
            bodyPart: dto.bodyPart,
        })
        const exercisesWithCalories = await Promise.all(
            exercises.map(async (exercise) => {
                const calories = await this.getExerciseCalories({
                    id: exercise.id,
                    userId: dto.userId,
                })
                return {
                    ...exercise,
                    calories
                }
            })
        )
        return exercisesWithCalories.map((exercise) => this.adaptExercise(exercise))
    }

    async deleteExercise(dto: DeleteExerciseDTO): Promise<void> {
        const exercise = await this.exerciseOrmService.queryOne({
            id: dto.id,
        })
        if (!exercise) {
            return
        }
        await this.exerciseOrmService.delete({
            id: dto.id,
        })
        await this.imageService.delete({
            demonstration: exercise.demonstration,
        })
    }

    private async queryExercise(dto: GetOneExerciseDTO): Promise<ExerciseDTO | null> {
        const exercise = await this.exerciseOrmService.queryOne({
            id: dto.id
        })
        const calories = await this.getExerciseCalories(dto)
        if (!exercise) {
            return null
        }
        return {
            ...exercise,
            calories,
        }
    }

    async getExerciseCalories(dto: GetExerciseCaloriesDTO): Promise<number> {
        const exercise = await this.exerciseOrmService.queryOne({
            id: dto.id,
        })
        if (!exercise) {
            throw new NotFoundException(ExerciseException.NOT_FOUND)
        }
        const repetitions = await this.repetitionsService.getRepetitions({
            exerciseId: exercise.id,
        })
        const user = await this.userService.getUser({ id: dto.userId })
        const difficulty = user.difficulty
        if (difficulty === UserDifficulty.BEGINNER) {
            return repetitions.beginner * exercise.calories
        } else if (difficulty === UserDifficulty.INTERMEDIATE) {
            return repetitions.intermediate * exercise.calories
        } else if (difficulty === UserDifficulty.ADVANCED) {
            return repetitions.advanced * exercise.calories
        }
        throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR)
    }

    adaptExercise(exercise: ExerciseDTO): ExercisePayloadDTO {
        return {
            id: exercise.id,
            header: exercise.header,
            demonstration: exercise.demonstration,
            calories: exercise.calories,
        }
    }
}
