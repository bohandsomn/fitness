import { ApiProperty } from '@nestjs/swagger'
import { Set } from '@prisma/client'
import { IsString } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto.js'
import { AppException } from '../../constants/app.exception.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name.js'
import { ApiPropertySetDescription } from '../../common/decorators/api-property-set-description.js'

export class CreateSetDTO implements Partial<Set> {
    @ApiPropertySetName()
    readonly name: string

    @ApiPropertySetDescription()
    readonly description: string

    @ApiProperty({ type: ImageDTO })
    readonly image: ImageDTO

    @ApiPropertyUserId()
    readonly userId: number
}

export class CreateSetBodyDTO implements Partial<Set> {
    @ApiPropertySetName()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly name: string

    @ApiPropertySetDescription()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly description: string
}
