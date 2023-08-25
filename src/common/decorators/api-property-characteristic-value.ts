import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'

export const ApiPropertyCharacteristicValue = (options?: ApiPropertyOptions) => ApiProperty({
    example: 'Legs',
    required: true,
    nullable: false,
    description: 'Characteristic\'s value',
    ...options,
})