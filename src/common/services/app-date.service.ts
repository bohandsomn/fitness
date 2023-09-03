export class AppDate extends Date {
    constructor(value: string | number | Date)
    constructor()
    constructor(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number)
    constructor(value: string | number)
    constructor(...args: [value: string | number | Date] | [] | [year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number] | [value: string | number]) {
        super(...args as never as [])
        if (args.length !== 1) {
            const timezoneOffsetMinutes = this.getTimezoneOffset()
            const hoursDifference = Math.floor(Math.abs(timezoneOffsetMinutes) / 60)
            const minutesDifference = Math.abs(timezoneOffsetMinutes) % 60
            const hours = this.getHours()
            const minutes = this.getMinutes()
            const newHours = hours + hoursDifference
            const newMinutes = minutes + minutesDifference
            this.setHours(newHours, newMinutes)
        }
    }
}
