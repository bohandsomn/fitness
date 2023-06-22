import { Gender } from '@prisma/client'

export class CalculateCaloriesDTO {
    readonly gender: Gender
    readonly currentWeight: number
    readonly goalWeight: number
    readonly height: number
    readonly age: number
    readonly startDate: Date
    readonly endDate: Date
}
