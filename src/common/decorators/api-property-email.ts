import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyEmail = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'bohdan.lukianchenko@gmail.com',
    required: true,
    nullable: false,
    description: 'User\'s email',
    ...options,
})