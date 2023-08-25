import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyUserBirthday = (options?: ApiPropertyOptions) => ApiProperty({
    example: new Date(2000, 0, 1, 3),
    required: true,
    nullable: false,
    description: 'User\'s date of birth',
    ...options,
})