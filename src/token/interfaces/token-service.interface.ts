import { DeleteTokenDTO } from '../dto/delete-token.dto.js'
import { GenerateTokenDTO } from '../dto/generate-token.dto.js'
import { RefreshTokenDTO } from '../dto/refresh-token.dto.js'
import { SaveTokenDTO } from '../dto/save-token.dto.js'
import { SplitTokenDTO } from '../dto/split-token.dto.js'
import { TokensPayloadDTO } from '../dto/tokens-payload.dto.js'
import { VerifyTokenDTO } from '../dto/verify-token.dto.js'

export interface ITokenService {
    generateTokens(dto: GenerateTokenDTO): TokensPayloadDTO
    saveToken(dto: SaveTokenDTO): Promise<void>
    refreshToken(dto: RefreshTokenDTO): Promise<TokensPayloadDTO>
    deleteToken(dto: DeleteTokenDTO): Promise<void>
    splitToken(dto: SplitTokenDTO): string
    verifyToken(dto: VerifyTokenDTO): Promise<GenerateTokenDTO>
}
