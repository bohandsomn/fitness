import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyExerciseDescription = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'Interesting fact',
    required: true,
    nullable: false,
    description: 'Exercise\'s description',
    ...options,
})