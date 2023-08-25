import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserHeight = (options?: ApiPropertyOptions) => ApiProperty({
    example: 174,
    required: true,
    nullable: false,
    description: 'User\'s height',
    ...options,
})