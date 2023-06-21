import { UserTokensDTO } from '../auth/dto/user-tokens.dto'
import { AssignAdminRoleDTO } from './dto/assign-admin-role.dto'
import { UpdateUserBodyDTO } from './dto/update-user.dto'

export interface IUserController {
    updateUser(dto: UpdateUserBodyDTO, userId: number): Promise<UserTokensDTO>
    assignAdminRole(dto: AssignAdminRoleDTO): Promise<UserTokensDTO>
}
