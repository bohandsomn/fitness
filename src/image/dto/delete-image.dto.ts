import { ApiProperty } from '@nestjs/swagger'

export class DeleteImageDTO {
    @ApiProperty({ example: '64918c8a06370748f2f3f7c3', required: true, nullable: false, description: 'Link, it leads to an image' })
    readonly demonstration: string
}