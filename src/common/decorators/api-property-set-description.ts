import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertySetDescription = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'Interesting fact',
    required: true,
    nullable: false,
    description: 'Set\'s description',
    ...options,
})