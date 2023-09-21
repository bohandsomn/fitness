import { ApiProperty } from '@nestjs/swagger'
import { Set } from '@prisma/client'
import { IsNumber } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto.js'
import { AppException } from '../../constants/app.exception.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name.js'
import { ApiPropertySetDescription } from '../../common/decorators/api-property-set-description.js'

export class UpdateSetDTO implements Partial<Set> {
    @ApiPropertySetId()
    readonly id: number

    @ApiPropertySetName({ required: false, nullable: true })
    readonly name?: string

    @ApiPropertySetDescription({ required: false, nullable: true })
    readonly description?: string

    @ApiProperty({ type: ImageDTO, required: false, nullable: true })
    readonly image?: ImageDTO

    @ApiPropertyUserId()
    readonly userId: number
}

export class UpdateSetBodyDTO implements Partial<Set> {
    @ApiPropertySetId()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly id: number

    @ApiPropertySetName({ required: false, nullable: true })
    readonly name?: string

    @ApiPropertySetDescription({ required: false, nullable: true })
    readonly description?: string
}
