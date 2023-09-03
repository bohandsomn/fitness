import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { AppDate } from '../services/app-date.service'

export const ApiPropertyHistoryDateTime = (options?: ApiPropertyOptions) => ApiProperty({
    example: new AppDate(2023, 5, 21, 11, 45, 59).toISOString(),
    required: true,
    nullable: false,
    description: 'Date time',
    ...options,
})