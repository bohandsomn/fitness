import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'

export class GetProgressInCaloriesDTO {
    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly startDate?: Date

    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly endDate?: Date

    @ApiPropertyUserId()
    readonly userId: number
}

export class GetProgressInCaloriesBodyDTO {
    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly startDate?: Date

    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly endDate?: Date
}
