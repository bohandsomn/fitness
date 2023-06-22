import { ApiProperty } from '@nestjs/swagger'

export class UpdateImageDTO {
    @ApiProperty({ example: '64918c8a06370748f2f3f7c3', required: true, nullable: false, description: 'Link, it leads to an image' })
    readonly demonstration: string

    @ApiProperty({ type: Buffer })
    readonly file: Buffer

    @ApiProperty({ example: 'gif', required: true, nullable: false, description: 'Extension of file (gif, png, jpg, webp etc.)' })
    readonly extension: string
}