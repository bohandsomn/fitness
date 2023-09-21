import { User } from '@prisma/client'
import { CreateUserDTO } from '../dto/create-user.dto.js'
import { UpdateUserDTO } from '../dto/update-user.dto.js'
import { GetUserDTO } from '../dto/get-user.dto.js'
import { ActivateUserDTO } from '../dto/activate-user.dto.js'
import { UserPayloadDTO } from '../dto/user-payload.dto.js'
import { CheckPasswordDTO } from '../dto/check-password.dto.js'
import { AssignAdminRoleDTO } from '../dto/assign-admin-role.dto.js'
import { SaveTokenDTO } from '../dto/save-token.dto.js'
import { DeleteTokenDTO } from '../dto/delete-token.dto.js'

export interface IUserService {
    createUser(dto: CreateUserDTO): Promise<User>
    updateUser(dto: UpdateUserDTO): Promise<User>
    getUser(dto: GetUserDTO): Promise<User>
    activateUser(dto: ActivateUserDTO): Promise<void>
    adaptUser(user: User): Promise<UserPayloadDTO>
    checkPassword(dto: CheckPasswordDTO): Promise<void>
    assignAdminRole(dto: AssignAdminRoleDTO): Promise<User>
    saveToken(dto: SaveTokenDTO): Promise<void>
    deleteToken(dto: DeleteTokenDTO): Promise<void>
}
