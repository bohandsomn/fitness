import { DeleteTokenDTO } from './dto/delete-token.dto'
import { GenerateTokenDTO } from './dto/generate-token.dto'
import { RefreshTokenDTO } from './dto/refresh-token.dto'
import { SaveTokenDTO } from './dto/save-token.dto'
import { SplitTokenDTO } from './dto/split-token.dto'
import { TokensPayloadDTO } from './dto/tokens-payload.dto'
import { VerifyTokenDTO } from './dto/verify-token.dto'

export interface ITokenService {
    generateTokens(dto: GenerateTokenDTO): TokensPayloadDTO
    saveToken(dto: SaveTokenDTO): Promise<void>
    refreshToken(dto: RefreshTokenDTO): Promise<TokensPayloadDTO>
    deleteToken(dto: DeleteTokenDTO): Promise<void>
    splitToken(dto: SplitTokenDTO): string
    verifyToken(dto: VerifyTokenDTO): Promise<GenerateTokenDTO>
}
