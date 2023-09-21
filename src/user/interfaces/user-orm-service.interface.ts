import { CreateUserInput } from '../dto/create-user.input.js'
import { UpdateUserInput } from '../dto/update-user.input.js'
import { GetUserInput } from '../dto/get-user.input.js'
import { UserModel } from '../models/user.model.js'

export interface IUserOrmService {
    create(input: CreateUserInput): Promise<UserModel>
    update(input: UpdateUserInput): Promise<UserModel>
    queryOne(input: GetUserInput): Promise<UserModel | null>
}
