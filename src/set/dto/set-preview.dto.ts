import { ApiProperty } from '@nestjs/swagger'

export class SetPreviewDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    readonly id: number

    @ApiProperty({ example: 'For legs', required: true, nullable: false, description: 'Set\'s name' })
    readonly name: string

    @ApiProperty({ example: '64918c8a06370748f2f3f7c3', required: true, nullable: false, description: 'Link, it leads to an image' })
    readonly demonstration: string

    @ApiProperty({ example: 1000, required: true, nullable: false, description: 'The amount of calories of exercise' })
    readonly calories: number
}
