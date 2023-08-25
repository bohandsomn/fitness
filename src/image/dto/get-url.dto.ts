import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'

export class GetUrlDTO {
    @ApiPropertyDemonstration()
    readonly demonstration: string

    @ApiProperty({ example: 1000, required: true, nullable: false, description: 'Image\'s width' })
    readonly width: number

    @ApiProperty({ example: 200, required: true, nullable: false, description: 'Image\'s height' })
    readonly height: number

    @ApiProperty({ example: 0.7, required: true, nullable: false, description: 'Image\'s quality' })
    readonly quality: number
}