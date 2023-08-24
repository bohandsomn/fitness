import { ApiProperty } from '@nestjs/swagger'
import { TokenType } from '../constants/token.const'

export class VerifyTokenDTO {
    @ApiProperty({ example: 'qwe.rty.uio', required: true, nullable: false, description: 'User\'s token' })
    readonly token: string

    @ApiProperty({ enum: TokenType, example: TokenType.ACCESS, required: true, nullable: false, description: 'Token type' })
    readonly type: TokenType
}