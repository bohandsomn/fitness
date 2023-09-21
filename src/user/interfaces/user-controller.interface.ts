import { UserTokensDTO } from '../../auth/dto/user-tokens.dto.js'
import { AssignAdminRoleDTO } from '../dto/assign-admin-role.dto.js'
import { UpdateUserBodyDTO } from '../dto/update-user.dto.js'

export interface IUserController {
    updateUser(dto: UpdateUserBodyDTO, userId: number): Promise<UserTokensDTO>
    assignAdminRole(dto: AssignAdminRoleDTO): Promise<UserTokensDTO>
}
