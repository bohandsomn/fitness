import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { AppDate } from '../services/app-date.service.js'

export const ApiPropertyUserGoalDate = (options?: ApiPropertyOptions) => ApiProperty({
    example: new AppDate(2030, 0, 1),
    required: true,
    nullable: false,
    description: 'The date when the user stops training',
    ...options,
})