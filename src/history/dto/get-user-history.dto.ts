import { IsEmpty } from 'class-validator'
import { AppException } from '../../constants/app.exception'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'
import { ApiPropertyHistoryDate } from '../../common/decorators/api-property-history-date'

export class GetUserHistoryDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyHistoryDate()
    readonly startDate: Date

    @ApiPropertyHistoryDate()
    readonly endDate: Date
}

export class GetUserHistoryBodyDTO {
    @ApiPropertyHistoryDate()
    @IsEmpty({
        message: AppException.DATE_NOT_VALID,
    })
    readonly date: Date
}
