import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'
import { ApiPropertyImageExtension } from '../../common/decorators/api-property-image-extension'

export class UpdateImageDTO {
    @ApiPropertyDemonstration()
    readonly demonstration: string

    @ApiProperty({ type: Buffer })
    readonly file: Buffer

    @ApiPropertyImageExtension()
    readonly extension: string
}