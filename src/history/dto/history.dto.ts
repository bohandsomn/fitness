import { ApiProperty } from '@nestjs/swagger'
import { IDateTime } from '../../date/interfaces/date-time.interface.js'
import { ExercisePayloadDTO } from '../../exercise/dto/exercise-payload.dto.js'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories.js'
import { ApiPropertyHistoryDateTime } from '../../common/decorators/api-property-history-date-time.js'

export class HistoryDTO {
    @ApiProperty({ type: [ExercisePayloadDTO] })
    readonly exercises: ExercisePayloadDTO[]

    @ApiPropertyCalories()
    readonly calories: number

    @ApiPropertyHistoryDateTime()
    readonly date: IDateTime
}
