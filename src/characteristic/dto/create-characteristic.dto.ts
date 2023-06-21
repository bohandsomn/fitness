import { ApiProperty } from '@nestjs/swagger'

export class CreateCharacteristicDTO {
    @ApiProperty({ example: 'Legs', required: true, nullable: false, description: 'Characteristic\'s value' })
    readonly value: string
}
