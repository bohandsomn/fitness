import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyHistoryDateTime = (options?: ApiPropertyOptions) => ApiProperty({
    example: new Date(2023, 5, 21, 11 + 3, 45, 59).toISOString(),
    required: true,
    nullable: false,
    description: 'Date time',
    ...options,
})