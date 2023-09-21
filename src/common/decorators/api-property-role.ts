import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { UserRole } from '../../user/constants/user.const.js'

export const ApiPropertyRole = (options?: ApiPropertyOptions) => ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    required: true,
    nullable: false,
    description: 'User\s role',
    ...options,
})