import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyDemonstration = (options?: ApiPropertyOptions) => ApiProperty({
    example: '64918c8a06370748f2f3f7c3',
    required: true,
    nullable: false,
    description: 'Link, it leads to an image',
    ...options,
})