import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateExerciseDTO } from './dto/create-exercise.dto'
import { IExerciseService } from './exercise-service.interface'
import { ExercisePayloadDTO } from './dto/exercise-payload.dto'
import { UpdateExerciseDTO } from './dto/update-exercise.dto'
import { GetOneExerciseDTO } from './dto/get-one-exercise.dto'
import { ExerciseException } from './exercise.exception'
import { GetManyExercisesDTO } from './dto/get-many-exercises.dto'
import { DeleteExerciseDTO } from './dto/delete-exercise.dto'
import { ExerciseDTO } from './dto/exercise.dto'
import { OrmService } from '../orm/orm.service'
import { ImageService } from '../image/image.service'
import { UserService } from '../user/user.service'
import { RepetitionsService } from '../repetitions/repetitions.service'

@Injectable()
export class ExerciseService implements IExerciseService {
    constructor(
        private readonly ormService: OrmService,
        private readonly imageService: ImageService,
        private readonly userService: UserService,
        private readonly repetitionsService: RepetitionsService
    ) { }

    async createExercise(dto: CreateExerciseDTO): Promise<ExercisePayloadDTO> {
        const demonstration = await this.imageService.createImage(dto.image)
        const exercise = await this.ormService.exercise.create({
            data: {
                calories: dto.calories,
                header: dto.header,
                description: dto.description,
                demonstration,
            },
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
            ? await this.imageService.updateImage({
                ...dto.image,
                demonstration: exercise.demonstration,
            })
            : undefined
        await this.repetitionsService.updateRepetitions({
            exerciseId: exercise.id,
            ...dto
        })
        return this.ormService.exercise.update({
            where: exercise,
            data: {
                calories: dto.calories || exercise.calories,
                header: dto.header || exercise.header,
                description: dto.description || exercise.description,
                demonstration: demonstration || exercise.demonstration,
            }
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
        const exercises = await this.ormService.exercise.findMany({
            where: {
                OR: {
                    set: {
                        every: {
                            id: dto.setId,
                        }
                    },
                    header: {
                        search: dto.header
                    },
                    calories: {
                        gte: dto.caloriesFrom,
                        lte: dto.caloriesTo
                    },
                    type: {
                        every: {
                            value: dto.type
                        }
                    },
                    bodyParts: {
                        every: {
                            value: dto.bodyPart
                        }
                    }
                }
            }
        })
        return exercises.map((exercise) => this.adaptExercise(exercise))
    }

    async deleteExercise(dto: DeleteExerciseDTO): Promise<void> {
        await this.ormService.exercise.delete({
            where: {
                id: dto.id,
            }
        })
    }

    private async queryExercise(dto: GetOneExerciseDTO): Promise<ExerciseDTO | null> {
        const user = await this.userService.getUser({ id: dto.userId })
        const exercise = await this.ormService.exercise.findFirst({
            where: {
                AND: {
                    repetitions: {
                        every: {
                            difficulty: user.difficulty,
                        }
                    },
                    id: dto.id
                }
            }
        })
        return exercise
    }

    adaptExercise(exercise: ExerciseDTO): ExercisePayloadDTO {
        return {
            id: exercise.id,
            header: exercise.header,
            demonstration: exercise.demonstration,
        }
    }
}
