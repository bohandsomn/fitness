import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyCharacteristicId = (options?: ApiPropertyOptions) => ApiProperty({
    example: 1,
    required: true,
    nullable: false,
    description: 'Characteristic\'s id',
    ...options,
})