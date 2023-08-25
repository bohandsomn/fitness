import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserIsActive = (options?: ApiPropertyOptions) => ApiProperty({
    example: true,
    required: true,
    nullable: false,
    description: 'A value that describes whether the user confirmed the email',
    ...options,
})