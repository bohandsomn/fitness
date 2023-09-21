import { IDateTime } from './date-time.interface.js'
import { DateTimeDTO } from '../dto/date-time.dto.js'
import { GetDateDifferenceDTO } from '../dto/get-date-difference.dto.js'

export interface IDateService {
    getDateTimeStart(date: Date): DateTimeDTO
    getDateTimeEnd(date: Date): DateTimeDTO
    adaptDateTime(dto: DateTimeDTO): IDateTime
    adaptDateTime(data: IDateTime): DateTimeDTO
    getDateDifference(dto: GetDateDifferenceDTO): Date[]
}
