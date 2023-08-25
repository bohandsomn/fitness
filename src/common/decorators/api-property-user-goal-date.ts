import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserGoalDate = (options?: ApiPropertyOptions) => ApiProperty({
    example: new Date(2030, 0, 1),
    required: true,
    nullable: false,
    description: 'The date when the user stops training',
    ...options,
})