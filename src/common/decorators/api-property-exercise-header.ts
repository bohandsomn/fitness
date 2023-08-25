import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyExerciseHeader = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'Sit-ups',
    required: true,
    nullable: false,
    description: 'Exercise\'s name',
    ...options,
})