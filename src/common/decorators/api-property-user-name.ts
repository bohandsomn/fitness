import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserName = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'Bohdan',
    required: true,
    nullable: false,
    description: 'User\'s name',
    ...options,
})