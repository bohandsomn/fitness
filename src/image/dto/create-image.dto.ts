import { ApiProperty } from '@nestjs/swagger'

export class CreateImageDTO {
    @ApiProperty({ type: Buffer })
    readonly file: Buffer

    @ApiProperty({ example: 'gif', required: true, nullable: false, description: 'Extension of file (gif, png, jpg, webp etc.)' })
    readonly extension: string
}