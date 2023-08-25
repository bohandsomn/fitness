import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserGoalWeight = (options?: ApiPropertyOptions) => ApiProperty({
    example: 70,
    required: true,
    nullable: false,
    description: 'Goal weight. Less than current weight',
    ...options,
})