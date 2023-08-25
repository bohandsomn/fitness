import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyLink = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'qwertyui',
    required: true,
    nullable: false,
    description: 'User\'s unique link',
    ...options,
})