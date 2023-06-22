import { ApiProperty } from '@nestjs/swagger'

export class CharacteristicPreviewDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Characteristic\'s id' })
    readonly id: number

    @ApiProperty({ example: 'Legs', required: true, nullable: false, description: 'Characteristic\'s value' })
    readonly value: string
}
