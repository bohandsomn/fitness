import { IDateTime } from './date-time.interface'
import { DateTimeDTO } from './dto/date-time.dto'

export interface IDateService {
    getDateTimeStart(date: Date): DateTimeDTO
    getDateTimeEnd(date: Date): DateTimeDTO
    adaptDateTime(dto: DateTimeDTO): IDateTime
    adaptDateTime(data: IDateTime): DateTimeDTO
}
