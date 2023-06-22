import { ApiProperty } from '@nestjs/swagger'

export class GetUrlDTO {
    @ApiProperty({ example: '64918c8a06370748f2f3f7c3', required: true, nullable: false, description: 'Link, it leads to an image' })
    readonly demonstration: string

    @ApiProperty({ example: 1000, required: true, nullable: false, description: 'Image\'s width' })
    readonly width: number

    @ApiProperty({ example: 200, required: true, nullable: false, description: 'Image\'s height' })
    readonly height: number

    @ApiProperty({ example: 0.7, required: true, nullable: false, description: 'Image\'s quality' })
    readonly quality: number
}