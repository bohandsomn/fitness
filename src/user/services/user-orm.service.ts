import { Injectable } from '@nestjs/common'
import { IUserOrmService } from '../interfaces/user-orm-service.interface.js'
import { OrmService } from '../../orm/services/orm.service.js'
import { CreateUserInput } from '../dto/create-user.input.js'
import { UserModel } from '../models/user.model.js'
import { AppDate } from '../../common/services/app-date.service.js'
import { UpdateUserInput } from '../dto/update-user.input.js'
import { GetUserInput } from '../dto/get-user.input.js'

@Injectable()
export class UserOrmService implements IUserOrmService {
    constructor(
        private readonly ormService: OrmService
    ) { }

    async create(input: CreateUserInput): Promise<UserModel> {
        const { goalDate, birthday, ...data } = input
        const user = await this.ormService.user.create({
            data: {
                ...data,
                goalDate: new AppDate(goalDate),
                birthday: new AppDate(birthday),
            }
        })
        return user
    }

    async update(input: UpdateUserInput): Promise<UserModel> {
        const data: Partial<UserModel> = {}
        if (input.name) {
            data.name = input.name
        }
        if (input.email) {
            data.email = input.email
        }
        if (input.difficulty) {
            data.difficulty = input.difficulty
        }
        if (input.height) {
            data.height = input.height
        }
        if (input.weight) {
            data.weight = input.weight
        }
        if (input.goalWeight) {
            data.goalWeight = input.goalWeight
        }
        if (input.goalDate) {
            data.goalDate = new AppDate(input.goalDate)
        }
        if (input.gender) {
            data.gender = input.gender
        }
        if (input.birthday) {
            data.birthday = new AppDate(input.birthday)
        }
        if (input.password) {
            data.password = input.password
        }
        if (typeof input.isActive === 'boolean') {
            data.isActive = input.isActive
        }
        if (input.role) {
            data.role = input.role
        }
        if (typeof input.refreshToken === 'string') {
            data.refreshToken = input.refreshToken
        }
        const user = await this.ormService.user.update({
            where: {
                id: input.id,
            },
            data,
        })
        return user
    }

    async queryOne(input: GetUserInput): Promise<UserModel | null> {
        const conditions: Partial<UserModel>[] = []
        if (input.id) {
            conditions.push({
                id: input.id,
            })
        }
        if (input.email) {
            conditions.push({
                email: input.email,
            })
        }
        if (input.link) {
            conditions.push({
                link: input.link,
            })
        }
        if (conditions.length === 0) {
            return null
        }
        const user = await this.ormService.user.findFirst({
            where: {
                OR: conditions
            }
        })
        return user
    }
}
