import { CreateUserInput } from '../dto/create-user.input'
import { UpdateUserInput } from '../dto/update-user.input'
import { GetUserInput } from '../dto/get-user.input'
import { UserModel } from '../models/user.model'

export interface IUserOrmService {
    create(input: CreateUserInput): Promise<UserModel>
    update(input: UpdateUserInput): Promise<UserModel>
    queryOne(input: GetUserInput): Promise<UserModel | null>
}
