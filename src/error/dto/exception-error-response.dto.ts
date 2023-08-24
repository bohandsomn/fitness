import { ApiProperty } from '@nestjs/swagger'

export class ExceptionErrorResponseDTO {
    @ApiProperty({ example: 'User is not found', required: true, nullable: false, description: 'Custom error message' })
    readonly message: string
}