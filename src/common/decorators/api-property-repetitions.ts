import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyRepetitions = (options?: ApiPropertyOptions) => ApiProperty({
    example: 20,
    required: true,
    nullable: false,
    description: 'Number of repetitions',
    ...options,
})