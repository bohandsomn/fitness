import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { UserDifficulty } from '../../user/constants/user.const'

export const ApiPropertyDifficulty = (options?: ApiPropertyOptions) => ApiProperty({
    enum: UserDifficulty,
    example: UserDifficulty.ADVANCED,
    required: true,
    nullable: false,
    description: 'Difficulty in training',
    ...options,
})