import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyPassword = (options?: ApiPropertyOptions) => ApiProperty({
    example: '12345678',
    required: true,
    nullable: false,
    description: 'User\'s password. From 8 to 12 characteristics',
    ...options,
})