import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertySetName = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'For legs',
    required: true,
    nullable: false,
    description: 'Set\'s name',
    ...options,
})