import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyHistoryDate = (options?: ApiPropertyOptions) => ApiProperty({
    type: Date,
    example: new Date(),
    required: true,
    nullable: false,
    description: 'Date to retrieve history',
    ...options,
})