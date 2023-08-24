import { User } from '@prisma/client'
import { CreateUserDTO } from '../dto/create-user.dto'
import { UpdateUserDTO } from '../dto/update-user.dto'
import { GetUserDTO } from '../dto/get-user.dto'
import { ActivateUserDTO } from '../dto/activate-user.dto'
import { UserPayloadDTO } from '../dto/user-payload.dto'
import { CheckPasswordDTO } from '../dto/check-password.dto'
import { AssignAdminRoleDTO } from '../dto/assign-admin-role.dto'

export interface IUserService {
    createUser(dto: CreateUserDTO): Promise<User>
    updateUser(dto: UpdateUserDTO): Promise<User>
    getUser(dto: GetUserDTO): Promise<User>
    activateUser(dto: ActivateUserDTO): Promise<void>
    adaptUser(user: User): Promise<UserPayloadDTO>
    checkPassword(dto: CheckPasswordDTO): Promise<void>
    assignAdminRole(dto: AssignAdminRoleDTO): Promise<User>
}
