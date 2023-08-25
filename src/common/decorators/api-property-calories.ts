import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyCalories = (options?: ApiPropertyOptions) => ApiProperty({
    example: 100,
    required: true,
    nullable: false,
    description: 'Integer calories',
    ...options,
})