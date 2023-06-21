import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IDateService } from './date-service.interface'
import { DateTimeDTO } from './dto/date-time.dto'
import { IDateTime } from './date-time.interface'
import { AppException } from 'src/app.exception'

@Injectable()
export class DateService implements IDateService {
    getDateTimeStart(date: Date): DateTimeDTO {
        date = new Date(date)
        return {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate(),
            hour: 0,
            minute: 0,
            second: 0,
        }
    }

    getDateTimeEnd(date: Date): DateTimeDTO {
        date = new Date(date)
        return {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth() + 1,
            day: date.getUTCDate(),
            hour: 23,
            minute: 59,
            second: 59,
        }
    }

    adaptDateTime(dto: DateTimeDTO): IDateTime
    adaptDateTime(data: IDateTime): DateTimeDTO
    adaptDateTime(data: unknown): DateTimeDTO | IDateTime {
        if (DateTimeDTO.isDateTimeDTO(data)) {
            return `${data.year}-${data.month}-${data.day}T${data.hour}:${data.minute}:${data.second}.000Z`
        }
        if (typeof data === 'string') {
            const date = new Date(data)
            return {
                year: date.getUTCFullYear(),
                month: date.getUTCMonth() + 1,
                day: date.getUTCDate(),
                hour: date.getUTCHours(),
                minute: date.getUTCMinutes(),
                second: date.getUTCSeconds(),
            }
        }
        throw new InternalServerErrorException(AppException.DATE_NOT_VALID)
    }
}
