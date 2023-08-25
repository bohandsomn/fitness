import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyImageExtension = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'gif',
    required: true,
    nullable: false,
    description: 'Extension of file (gif, png, jpg, webp etc.)',
    ...options,
})