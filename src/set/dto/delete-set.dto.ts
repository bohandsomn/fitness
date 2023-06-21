import { ApiProperty } from '@nestjs/swagger'

export class DeleteSetDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    readonly id: number
}
