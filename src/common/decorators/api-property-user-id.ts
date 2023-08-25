import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserId = (options?: ApiPropertyOptions) => ApiProperty({
    example: 1,
    required: true,
    nullable: false,
    description: 'User\'s id',
    ...options,
})