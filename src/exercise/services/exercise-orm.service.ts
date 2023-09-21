import { Injectable } from '@nestjs/common'
import { IExerciseOrmService } from '../interfaces/exercise-orm-service.interface.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CreateExerciseInput } from '../dto/create-exercise.input.js'
import { ExerciseModel } from '../models/exercise.model.js'
import { UpdateExerciseInput } from '../dto/update-exercise.input.js'
import { GetOneExerciseInput } from '../dto/get-one-exercise.input.js'
import { GetExercisesInput } from '../dto/get-exercises.input.js'
import { DeleteExerciseInput } from '../dto/delete-exercise.input.js'

@Injectable()
export class ExerciseOrmService implements IExerciseOrmService {
    constructor(
        private readonly ormService: OrmService
    ) { }

    async create(input: CreateExerciseInput): Promise<ExerciseModel> {
        const exercise = await this.ormService.exercise.create({
            data: {
                calories: input.calories,
                header: input.header,
                description: input.description,
                demonstration: input.demonstration,
            },
        })
        return exercise
    }

    async update(input: UpdateExerciseInput): Promise<ExerciseModel> {
        const data: Partial<ExerciseModel> = {}
        if (input.calories) {
            data.calories = input.calories
        }
        if (input.header) {
            data.header = input.header
        }
        if (input.description) {
            data.description = input.description
        }
        if (input.demonstration) {
            data.demonstration = input.demonstration
        }
        const exercise = await this.ormService.exercise.update({
            where: {
                id: input.id,
            },
            data,
        })
        return exercise
    }

    async queryOne(input: GetOneExerciseInput): Promise<ExerciseModel | null> {
        const exercise = await this.ormService.exercise.findFirst({
            where: {
                id: input.id
            }
        })
        return exercise
    }

    async getMany(input: GetExercisesInput): Promise<ExerciseModel[]> {
        const condition: any = {}
        if (input.setId) {
            condition.set = {
                some: {
                    id: input.setId,
                }
            }
        }
        if (input.header) {
            condition.header = {
                search: input.header
            }
        }
        if (input.caloriesFrom) {
            condition.calories = {
                gte: input.caloriesFrom,
            }
        }
        if (input.caloriesTo) {
            const calories = condition.calories
            if (calories) {
                condition.calories = {
                    ...condition.calories,
                    lte: input.caloriesTo
                }
            } else {
                condition.calories = {
                    lte: input.caloriesTo
                }
            }
        }
        if (input.type) {
            condition.type = {
                some: {
                    value: input.type
                }
            }
        }
        if (input.bodyPart) {
            condition.bodyPart = {
                some: {
                    value: input.bodyPart
                }
            }
        }
        const exercises = await this.ormService.exercise.findMany({
            where: {
                OR: condition
            }
        })
        return exercises
    }

    async delete(input: DeleteExerciseInput): Promise<void> {
        await this.ormService.exercise.delete({
            where: {
                id: input.id,
            }
        })
    }
}
