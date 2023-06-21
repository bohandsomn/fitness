import { ApiProperty } from '@nestjs/swagger'

export class GetCharacteristicDTO {
    @ApiProperty({ example: 1, required: false, nullable: true, description: 'Characteristic\'s id' })
    readonly id?: number

    @ApiProperty({ example: 'Legs', required: false, nullable: true, description: 'Characteristic\'s value' })
    readonly value?: string
}
