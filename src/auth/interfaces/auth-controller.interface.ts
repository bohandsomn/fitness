import { Response } from 'express'
import { AutoLogInUserDTO } from '../dto/auto-log-in-user.dto.js'
import { LogInUserDTO } from '../dto/log-in-user.dto.js'
import { RegisterUserDTO } from '../dto/register-user.dto.js'
import { UserTokensDTO } from '../dto/user-tokens.dto.js'

export interface IAuthController {
    registerUser(dto: RegisterUserDTO): Promise<UserTokensDTO>
    logInUser(dto: LogInUserDTO): Promise<UserTokensDTO>
    autoLogInUser(userId: number): Promise<UserTokensDTO>
    refreshToken(refreshToken: string): Promise<UserTokensDTO>
    logOutUser(refreshToken: string): Promise<void>
    activateUser(link: string, response: Response): Promise<void>
}
