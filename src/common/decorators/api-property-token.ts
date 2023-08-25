import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyToken = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'qwe.rty.uio',
    required: true,
    nullable: false,
    description: 'User\'s token',
    ...options,
})