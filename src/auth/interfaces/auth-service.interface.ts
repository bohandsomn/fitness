import { AutoLogInUserDTO } from '../dto/auto-log-in-user.dto.js'
import { LogInUserDTO } from '../dto/log-in-user.dto.js'
import { RegisterUserDTO } from '../dto/register-user.dto.js'
import { UserTokensDTO } from '../dto/user-tokens.dto.js'
import { LogOutUserDTO } from '../dto/log-out-user.dto.js'
import { RefreshTokenDTO } from '../../token/dto/refresh-token.dto.js'
import { ActivateUserDTO } from '../../user/dto/activate-user.dto.js'

export interface IAuthService {
    registerUser(dto: RegisterUserDTO): Promise<UserTokensDTO>
    logInUser(dto: LogInUserDTO): Promise<UserTokensDTO>
    autoLogInUser(dto: AutoLogInUserDTO): Promise<UserTokensDTO>
    refreshToken(dto: RefreshTokenDTO): Promise<UserTokensDTO>
    logOutUser(dto: LogOutUserDTO): Promise<void>
    activateUser(dto: ActivateUserDTO): Promise<void>
}
