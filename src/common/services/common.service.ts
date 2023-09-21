import { ConflictException, Injectable } from '@nestjs/common'
import { Difficulty, Gender } from '@prisma/client'
import * as uuid from 'uuid'
import { UserDifficulty, UserGender } from '../../user/constants/user.const.js'
import { UserException } from '../../user/constants/user.exception.js'
import { AppDate } from './app-date.service.js'

@Injectable()
export class CommonService {
    generateUniqueString(): string {
        return uuid.v4()
    }

    checkUserDifficulty(data: unknown): void {
        const isDifficulty = this.isUserDifficulty(data)
        if (!isDifficulty) {
            throw new ConflictException(UserException.IS_NOT_DIFFICULTY)
        }
    }

    checkUserGender(data: unknown): void {
        const isGender = this.isUserGender(data)
        if (!isGender) {
            throw new ConflictException(UserException.IS_NOT_GENDER)
        }
    }

    isUserDifficulty(data: unknown): data is Difficulty {
        if (data === UserDifficulty.BEGINNER) {
            return true
        } else if (data === UserDifficulty.INTERMEDIATE) {
            return true
        } else if (data === UserDifficulty.ADVANCED) {
            return true
        }
        return false
    }

    isUserGender(data: unknown): data is Gender {
        if (data === UserGender.MALE) {
            return true
        } else if (data === UserGender.FEMALE) {
            return true
        }
        return false
    }

    checkUserHeight(height: number): void {
        if (height <= 0) {
            throw new ConflictException(UserException.NOT_VALID_HEIGHT)
        }
    }

    checkUserWeight(weight: number, goalWeight?: number): void {
        if (weight <= 0) {
            throw new ConflictException(UserException.NOT_VALID_WEIGHT)
        }
        if (typeof goalWeight !== 'number') {
            return
        }
        if (goalWeight > weight) {
            throw new ConflictException(UserException.NOT_VALID_WEIGHT)
        }
    }

    checkUserGoalDate(
        goalDate: Date | string,
        registeredDate: Date | string = new AppDate(),
    ): void {
        const goalTime = new AppDate(goalDate).getTime()
        const registeredTime = new AppDate(registeredDate).getTime()
        if (goalTime < registeredTime) {
            throw new ConflictException(UserException.NOT_VALID_DATE)
        }
    }

    appDate(value: string | number | Date): Date;
    appDate(): Date;
    appDate(year: number, monthIndex: number, date?: number | undefined, hours?: number | undefined, minutes?: number | undefined, seconds?: number | undefined, ms?: number | undefined): Date;
    appDate(value: string | number): Date;
    appDate(value: string | number | Date): Date
    appDate(...args: [value: string | number | Date] | [] | [year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number] | [value: string | number]) {
        const date = new AppDate(...args as never as [])
        if (args.length !== 1) {
            const timezoneOffsetMinutes = date.getTimezoneOffset()
            const hoursDifference = Math.floor(Math.abs(timezoneOffsetMinutes) / 60)
            const minutesDifference = Math.abs(timezoneOffsetMinutes) % 60
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const newHours = hours + hoursDifference
            const newMinutes = minutes + minutesDifference
            date.setHours(newHours, newMinutes)
        }
        return date
    }
}
