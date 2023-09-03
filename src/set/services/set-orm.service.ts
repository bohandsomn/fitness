import { Injectable } from '@nestjs/common'
import { ISetOrmService } from '../interfaces/set-orm-service.interface'
import { OrmService } from '../../orm/services/orm.service'
import { CreateSetInput } from '../dto/create-set.input'
import { SetModel } from '../models/set.model'
import { UpdateSetInput } from '../dto/update-set.input'
import { GetSetInput } from '../dto/get-set.input'
import { GetSetsInput } from '../dto/get-sets.input'
import { DeleteSetInput } from '../dto/delete-set.input'
import { AddExerciseSetInput } from '../dto/add-exercise-set.input'
import { RemoveExerciseSetInput } from '../dto/remove-exercise-set.input'

@Injectable()
export class SetOrmService implements ISetOrmService {
    constructor(
        private readonly ormService: OrmService
    ) { }

    async create(input: CreateSetInput): Promise<SetModel> {
        const set = await this.ormService.set.create({
            data: {
                name: input.name,
                description: input.description,
                demonstration: input.demonstration,
                users: {
                    connect: {
                        id: input.userId
                    }
                }
            },
        })
        return set
    }

    async update(input: UpdateSetInput): Promise<SetModel> {
        const set = await this.ormService.set.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                description: input.description,
                demonstration: input.demonstration
            }
        })
        return set
    }

    async queryOne(input: GetSetInput): Promise<SetModel | null> {
        const condition: any = {
            id: input.id,
        }
        if (input.userId) {
            condition.users = {
                every: {
                    id: input.userId,
                }
            }
        }
        const set = await this.ormService.set.findFirst({
            where: condition
        })
        return set
    }

    async getMany(input: GetSetsInput): Promise<SetModel[]> {
        const sets = await this.ormService.set.findMany({
            where: {
                users: {
                    every: {
                        id: input.userId
                    }
                }
            }
        })
        return sets
    }

    async delete(input: DeleteSetInput): Promise<void> {
        await this.ormService.set.delete({
            where: {
                id: input.id,
            }
        })
    }

    async add(input: AddExerciseSetInput): Promise<void> {
        await this.ormService.set.update({
            where: {
                id: input.setId
            },
            data: {
                exercises: {
                    connect: {
                        id: input.exerciseId
                    }
                }
            }
        })
    }

    async remove(input: RemoveExerciseSetInput): Promise<void> {
        await this.ormService.set.update({
            where: {
                id: input.setId
            },
            data: {
                exercises: {
                    disconnect: {
                        id: input.exerciseId
                    }
                }
            }
        })
    }
}
