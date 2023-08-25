import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { TokenType } from '../../token/constants/token.const'

export const ApiPropertyTokenType = (options?: ApiPropertyOptions) => ApiProperty({
    enum: TokenType,
    example: TokenType.ACCESS,
    required: true,
    nullable: false,
    description: 'Token type',
    ...options,
})