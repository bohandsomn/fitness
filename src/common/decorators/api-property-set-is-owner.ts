import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertySetIsOwner = (options?: ApiPropertyOptions) => ApiProperty({
    example: true,
    required: true,
    nullable: false,
    description: 'If true then the user can manipulate the set of exercises and exercises',
    ...options,
})