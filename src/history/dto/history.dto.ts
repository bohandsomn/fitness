import { ApiProperty } from '@nestjs/swagger'
import { IDateTime } from '../../date/date-time.interface'
import { ExercisePayloadDTO } from '../../exercise/dto/exercise-payload.dto'

export class HistoryDTO {
    @ApiProperty({ type: [ExercisePayloadDTO] })
    readonly exercises: ExercisePayloadDTO[]

    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly calories: number

    @ApiProperty({ example: '2023-06-21T11:45:59.000Z', required: true, nullable: false, description: 'Date time' })
    readonly date: IDateTime
}
