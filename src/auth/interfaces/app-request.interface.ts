import { Request } from 'express'
import { GenerateTokenDTO } from '../../token/dto/generate-token.dto.js'

export interface AppRequest extends Request {
    user: GenerateTokenDTO
}
