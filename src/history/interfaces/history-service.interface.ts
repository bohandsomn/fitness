import { PushHistoryDTO } from '../dto/push-history.dto.js'
import { GetUserHistoryDTO } from '../dto/get-user-history.dto.js'
import { HistoryDTO } from '../dto/history.dto.js'

export interface IHistoryService {
    pushHistory(dto: PushHistoryDTO): Promise<void>
    getUserHistory(dto: GetUserHistoryDTO): Promise<HistoryDTO>
}
