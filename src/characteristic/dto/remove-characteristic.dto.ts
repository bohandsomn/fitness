import { ApiProperty } from '@nestjs/swagger'

export class RemoveCharacteristicDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Characteristic\'s id' })
    readonly characteristicId: number

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly exerciseId: number
}
