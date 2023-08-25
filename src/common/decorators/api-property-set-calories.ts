import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertySetCalories = (options?: ApiPropertyOptions) => ApiProperty({
    example: 1000,
    required: true,
    nullable: false,
    description: 'The amount of calories of exercise',
    ...options,
})