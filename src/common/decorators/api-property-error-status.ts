import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger'
import { HttpStatusCode } from 'axios'

export const ApiPropertyErrorStatus = (options?: ApiPropertyOptions) => ApiProperty({
    enum: HttpStatusCode,
    example: HttpStatusCode.BadRequest,
    required: true,
    nullable: false,
    description: 'Error status code',
    ...options,
})