import { ApiProperty } from '@nestjs/swagger'
import { IsEmpty } from 'class-validator'
import { AppException } from '../../constants/app.exception'

export class GetUserHistoryDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ type: Date, example: new Date(), required: true, nullable: false, description: 'Date to retrieve history' })
    readonly startDate: Date

    @ApiProperty({ type: Date, example: new Date(), required: true, nullable: false, description: 'Date to retrieve history' })
    readonly endDate: Date
}

export class GetUserHistoryBodyDTO {
    @ApiProperty({ type: Date, example: new Date(), required: true, nullable: false, description: 'Date to retrieve history' })
    @IsEmpty({
        message: AppException.DATE_NOT_VALID,
    })
    readonly date: Date
}
