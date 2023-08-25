import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyErrorMessage = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'User is not found',
    required: true,
    nullable: false,
    description: 'Custom error message',
    ...options,
})