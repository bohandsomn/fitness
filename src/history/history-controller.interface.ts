import { PushHistoryBodyDTO } from './dto/push-history.dto'

export interface IHistoryController {
    pushHistory(dto: PushHistoryBodyDTO, userId: number): Promise<void>
}
