import { IDateTime } from '../../date/interfaces/date-time.interface'

export class GetManyHistoriesInput {
    completedAtGt: IDateTime
    completedAtLt: IDateTime
}
