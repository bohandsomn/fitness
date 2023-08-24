import { ApiProperty } from '@nestjs/swagger'

export class ValidationErrorResponse {
    @ApiProperty({ type: [String] })
    readonly property: string[]
}
