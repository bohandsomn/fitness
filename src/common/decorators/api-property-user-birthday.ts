import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { AppDate } from '../services/app-date.service'

export const ApiPropertyUserBirthday = (options?: ApiPropertyOptions) => ApiProperty({
    example: new AppDate(2000, 0, 1, 3),
    required: true,
    nullable: false,
    description: 'User\'s date of birth',
    ...options,
})