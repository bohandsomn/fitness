import { PushHistoryDTO } from '../dto/push-history.dto'
import { GetUserHistoryDTO } from '../dto/get-user-history.dto'
import { HistoryDTO } from '../dto/history.dto'

export interface IHistoryService {
    pushHistory(dto: PushHistoryDTO): Promise<void>
    getUserHistory(dto: GetUserHistoryDTO): Promise<HistoryDTO>
}
