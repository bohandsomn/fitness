import { ConflictException, Injectable } from '@nestjs/common'
import { Difficulty, Gender } from '@prisma/client'
import * as uuid from 'uuid'
import { UserDifficulty, UserGender } from '../user/constants/user.const'
import { UserException } from '../user/constants/user.exception'

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
        registeredDate: Date | string = new Date(),
    ): void {
        const goalTime = new Date(goalDate).getTime()
        const registeredTime = new Date(registeredDate).getTime()
        if (goalTime < registeredTime) {
            throw new ConflictException(UserException.NOT_VALID_DATE)
        }
    }
}
