import { Injectable } from '@nestjs/common'
import { Exercise } from '@prisma/client'
import { OrmService } from '../orm/orm.service'
import { CreateExerciseDTO } from './dto/create-exercise.dto'

@Injectable()
export class ExerciseService {
    constructor(
        private readonly ormService: OrmService
    ) { }

    async createExercise(dto: CreateExerciseDTO): Promise<Exercise> {
        const exercise = await this.ormService.exercise.create({
            data: dto
        })
        return exercise
    }
}
