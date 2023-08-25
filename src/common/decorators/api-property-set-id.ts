import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertySetId = (options?: ApiPropertyOptions) => ApiProperty({
    example: 1,
    required: true,
    nullable: false,
    description: 'Set\'s id',
    ...options,
})