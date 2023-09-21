import { IDateTime } from '../../date/interfaces/date-time.interface.js'

export class GetManyHistoriesInput {
    completedAtGt: IDateTime
    completedAtLt: IDateTime
}
