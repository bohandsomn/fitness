import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { UserGender } from '../../user/constants/user.const.js'

export const ApiPropertyGender = (options?: ApiPropertyOptions) => ApiProperty({
    enum: UserGender,
    example: UserGender.MALE,
    required: true,
    nullable: false,
    description: 'User\'s gender',
    ...options,
})