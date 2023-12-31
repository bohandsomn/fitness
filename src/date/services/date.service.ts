import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { IDateService } from '../interfaces/date-service.interface.js'
import { DateTimeDTO } from '../dto/date-time.dto.js'
import { IDateTime } from '../interfaces/date-time.interface.js'
import { AppException } from '../../constants/app.exception.js'
import { GetDateDifferenceDTO } from '../dto/get-date-difference.dto.js'
import { AppDate } from '../../common/services/app-date.service.js'

@Injectable()
export class DateService implements IDateService {
    getDateTimeStart(date: Date): DateTimeDTO {
        date = new AppDate(date)
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
        date = new AppDate(date)
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
            return new AppDate(data.year, data.month - 1, data.day, data.hour, data.minute, data.second).toISOString() as IDateTime
        }
        if (typeof data === 'string') {
            const date = new AppDate(data)
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

    getDateDifference(dto: GetDateDifferenceDTO): Date[] {
        const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000
        const startDate = new AppDate(dto.startDate)
        const endDate = new AppDate(dto.endDate)
        let currentDate = new AppDate(startDate)
        const days: Date[] = []
        while (currentDate < endDate) {
            days.push(currentDate)
            currentDate = new AppDate(currentDate.getTime() + ONE_DAY_IN_MILLISECONDS)
        }
        return days
    }
}
