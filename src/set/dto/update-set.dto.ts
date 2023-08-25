import { ApiProperty } from '@nestjs/swagger'
import { Set } from '@prisma/client'
import { IsNumber } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto'
import { AppException } from '../../constants/app.exception'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name'
import { ApiPropertySetDescription } from '../../common/decorators/api-property-set-description'

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
