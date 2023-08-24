import { AutoLogInUserDTO } from '../dto/auto-log-in-user.dto'
import { LogInUserDTO } from '../dto/log-in-user.dto'
import { RegisterUserDTO } from '../dto/register-user.dto'
import { UserTokensDTO } from '../dto/user-tokens.dto'
import { LogOutUserDTO } from '../dto/log-out-user.dto'
import { RefreshTokenDTO } from '../../token/dto/refresh-token.dto'
import { ActivateUserDTO } from '../../user/dto/activate-user.dto'

export interface IAuthService {
    registerUser(dto: RegisterUserDTO): Promise<UserTokensDTO>
    logInUser(dto: LogInUserDTO): Promise<UserTokensDTO>
    autoLogInUser(dto: AutoLogInUserDTO): Promise<UserTokensDTO>
    refreshToken(dto: RefreshTokenDTO): Promise<UserTokensDTO>
    logOutUser(dto: LogOutUserDTO): Promise<void>
    activateUser(dto: ActivateUserDTO): Promise<void>
}
