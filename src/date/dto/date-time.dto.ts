import { ApiProperty } from '@nestjs/swagger'

export class DateTimeDTO {
    static isDateTimeDTO(data: unknown): data is DateTimeDTO {
        if (typeof data !== 'object' || data === null) {
            return false
        }
        const year = (data as Partial<DateTimeDTO>)?.year
        if (typeof year !== 'number') {
            return false
        }
        const month = (data as Partial<DateTimeDTO>)?.month
        if (typeof month !== 'number') {
            return false
        }
        const day = (data as Partial<DateTimeDTO>)?.day
        if (typeof day !== 'number') {
            return false
        }
        const hour = (data as Partial<DateTimeDTO>)?.hour
        if (typeof hour !== 'number') {
            return false
        }
        const minute = (data as Partial<DateTimeDTO>)?.minute
        if (typeof minute !== 'number') {
            return false
        }
        const second = (data as Partial<DateTimeDTO>)?.second
        if (typeof second !== 'number') {
            return false
        }
        return true
    }

    @ApiProperty({ example: 2023, required: true, nullable: false, description: 'Year' })
    readonly year: number

    @ApiProperty({ example: 6, required: true, nullable: false, description: 'Month' })
    readonly month: number

    @ApiProperty({ example: 21, required: true, nullable: false, description: 'Day' })
    readonly day: number

    @ApiProperty({ example: 10, required: true, nullable: false, description: 'Hour' })
    readonly hour: number

    @ApiProperty({ example: 46, required: true, nullable: false, description: 'Minute' })
    readonly minute: number

    @ApiProperty({ example: 59, required: true, nullable: false, description: 'Second' })
    readonly second: number
}
