import { Inject, Injectable, InternalServerErrorException, UnauthorizedException, forwardRef } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ITokenService } from '../interfaces/token-service.interface'
import { GenerateTokenDTO } from '../dto/generate-token.dto'
import { TokensPayloadDTO } from '../dto/tokens-payload.dto'
import { TokenType } from '../constants/token.const'
import { TokenException } from '../constants/token.exception'
import { SaveTokenDTO } from '../dto/save-token.dto'
import { RefreshTokenDTO } from '../dto/refresh-token.dto'
import { UserService } from '../../user/services/user.service'
import { VerifyTokenDTO } from '../dto/verify-token.dto'
import { DeleteTokenDTO } from '../dto/delete-token.dto'
import { SplitTokenDTO } from '../dto/split-token.dto'
import { Environment } from '../../common/constants/environment'

@Injectable()
export class TokenService implements ITokenService {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    generateTokens(dto: GenerateTokenDTO): TokensPayloadDTO {
        const accessToken = this.generateToken(dto, TokenType.ACCESS)
        const refreshToken = this.generateToken(dto, TokenType.REFRESH)
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken(dto: SaveTokenDTO): Promise<void> {
        await this.userService.saveToken({
            userId: dto.userId,
            token: dto.refreshToken,
        })
    }

    async refreshToken(dto: RefreshTokenDTO): Promise<TokensPayloadDTO> {
        const generateTokenDTO = await this.verifyToken({
            token: dto.refreshToken,
            type: TokenType.REFRESH,
        })
        const user = await this.userService.getUser({ id: generateTokenDTO.userId })
        const tokens = this.generateTokens({
            userId: user.id,
            isActive: user.isActive,
            role: user.role,
        })
        await this.saveToken({ refreshToken: tokens.refreshToken, userId: user.id })
        return tokens
    }

    async deleteToken(dto: DeleteTokenDTO): Promise<void> {
        const generateTokenDTO = await this.verifyToken({
            token: dto.refreshToken,
            type: TokenType.REFRESH,
        })
        await this.userService.deleteToken({
            userId: generateTokenDTO.userId,
        })
    }

    splitToken(dto: SplitTokenDTO): string {
        if (!dto.header) {
            throw new UnauthorizedException(TokenException.HEADER_NOT_DEFINED)
        }
        const [bearer, token] = dto.header.split(' ')
        const isBearer = bearer === 'Bearer'
        const isEmptyToken = token === undefined || token === ''
        if (!isBearer || isEmptyToken) {
            throw new UnauthorizedException(TokenException.TOKEN_NON_DEFINED)
        }
        return token
    }

    async verifyToken(dto: VerifyTokenDTO): Promise<GenerateTokenDTO> {
        try {
            const secretKey = this.getSecretKey(dto.type)
            const generateTokenDTO = this.jwtService.verify<GenerateTokenDTO | object>(
                dto.token,
                {
                    secret: secretKey
                }
            )
            if (!GenerateTokenDTO.isGenerateTokenDTO(generateTokenDTO)) {
                throw new UnauthorizedException(TokenException.PAYLOAD_NOT_VALID)
            }
            return generateTokenDTO
        } catch (error) {
            throw new UnauthorizedException(TokenException.PAYLOAD_NOT_VALID)
        }
    }

    private getSecretKey(type: TokenType): string {
        if (type === TokenType.ACCESS) {
            const accessSecretKey = this.configService.getOrThrow<string | undefined>(Environment.JWT_ACCESS_SECRET_KEY)
            return accessSecretKey
        } else if (type === TokenType.REFRESH) {
            const refreshSecretKey = this.configService.getOrThrow<string | undefined>(Environment.JWT_REFRESH_SECRET_KEY)
            return refreshSecretKey
        }
        throw new InternalServerErrorException(TokenException.TOKEN_TYPE_NOT_VALID)
    }

    private getExpiresIn(type: TokenType): string {
        if (type === TokenType.ACCESS) {
            const accessExpiresIn = this.configService.getOrThrow<string | undefined>(Environment.JWT_ACCESS_EXPIRES_IN)
            return accessExpiresIn
        } else if (type === TokenType.REFRESH) {
            const refreshExpiresIn = this.configService.getOrThrow<string | undefined>(Environment.JWT_REFRESH_EXPIRES_IN)
            return refreshExpiresIn
        }
        throw new InternalServerErrorException(TokenException.TOKEN_TYPE_NOT_VALID)
    }

    private generateToken(
        dto: GenerateTokenDTO,
        type: TokenType,
    ): string {
        const secret = this.getSecretKey(type)
        const expiresIn = this.getExpiresIn(type)
        const token = this.jwtService.sign(
            dto,
            {
                secret: secret,
                expiresIn: expiresIn
            }
        )
        return token
    }
}
