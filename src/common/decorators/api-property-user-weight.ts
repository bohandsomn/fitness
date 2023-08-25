import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserWeight = (options?: ApiPropertyOptions) => ApiProperty({
    example: 72,
    required: true,
    nullable: false,
    description: 'Current weight',
    ...options,
})