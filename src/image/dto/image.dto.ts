import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyImageExtension } from '../../common/decorators/api-property-image-extension.js'

export class ImageDTO {
    @ApiProperty({ type: Buffer })
    readonly file: Buffer

    @ApiPropertyImageExtension()
    readonly extension: string
}
