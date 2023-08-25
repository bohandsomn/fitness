import { ApiProperty } from '@nestjs/swagger'
import { Set } from '@prisma/client'
import { IsString } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto'
import { AppException } from '../../constants/app.exception'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name'
import { ApiPropertySetDescription } from '../../common/decorators/api-property-set-description'

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
