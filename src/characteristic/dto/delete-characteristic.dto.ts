import { ApiProperty } from '@nestjs/swagger'

export class DeleteCharacteristicDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Characteristic\'s id' })
    readonly id: number
}
