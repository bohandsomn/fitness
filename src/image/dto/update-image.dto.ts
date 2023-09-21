import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration.js'
import { ApiPropertyImageExtension } from '../../common/decorators/api-property-image-extension.js'

export class UpdateImageDTO {
    @ApiPropertyDemonstration()
    readonly demonstration: string

    @ApiProperty({ type: Buffer })
    readonly file: Buffer

    @ApiPropertyImageExtension()
    readonly extension: string
}