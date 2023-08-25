import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyExerciseId = (options?: ApiPropertyOptions) => ApiProperty({
    example: 1,
    required: true,
    nullable: false,
    description: 'Exercise\'s id',
    ...options,
})