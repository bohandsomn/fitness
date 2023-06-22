import { GetUserHistoryBodyDTO } from './dto/get-user-history.dto'
import { HistoryDTO } from './dto/history.dto'
import { PushHistoryBodyDTO } from './dto/push-history.dto'

export interface IHistoryController {
    pushHistory(dto: PushHistoryBodyDTO, userId: number): Promise<void>
    getUserHistory(dto: GetUserHistoryBodyDTO, userId: number): Promise<HistoryDTO>
}
