import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyError = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'Not found',
    required: true,
    nullable: false,
    description: 'Error message',
    ...options,
})