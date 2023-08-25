import { ApiProperty } from '@nestjs/swagger'
import { IDateTime } from '../../date/interfaces/date-time.interface'
import { ExercisePayloadDTO } from '../../exercise/dto/exercise-payload.dto'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'
import { ApiPropertyHistoryDateTime } from '../../common/decorators/api-property-history-date-time'

export class HistoryDTO {
    @ApiProperty({ type: [ExercisePayloadDTO] })
    readonly exercises: ExercisePayloadDTO[]

    @ApiPropertyCalories()
    readonly calories: number

    @ApiPropertyHistoryDateTime()
    readonly date: IDateTime
}
