import { ApiProperty } from '@nestjs/swagger'

export class GetBufferDTO {
    @ApiProperty({ example: 'domain/image/6491c16a06370748f2ccc29f?w=1000&h=200&q=0.7', required: true, nullable: false, description: 'URL, it leads to an image' })
    readonly url: string
}