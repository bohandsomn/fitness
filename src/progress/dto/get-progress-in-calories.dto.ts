import { ApiProperty } from '@nestjs/swagger'

export class GetProgressInCaloriesDTO {
    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly startDate?: Date

    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly endDate?: Date

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number
}

export class GetProgressInCaloriesBodyDTO {
    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly startDate?: Date

    @ApiProperty({ type: Date, required: false, nullable: true })
    readonly endDate?: Date
}
