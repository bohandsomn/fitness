import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { AppDate } from '../services/app-date.service'

export const ApiPropertyHistoryDate = (options?: ApiPropertyOptions) => ApiProperty({
    type: Date,
    example: new AppDate(),
    required: true,
    nullable: false,
    description: 'Date to retrieve history',
    ...options,
})