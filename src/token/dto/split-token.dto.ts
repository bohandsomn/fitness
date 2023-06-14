import { ApiProperty } from '@nestjs/swagger'

export class SplitTokenDTO {
    @ApiProperty({ example: 'Bearer qwe.rty.uio', required: true, nullable: false, description: 'Auth header' })
    readonly header: string
}
