import { GetUserHistoryBodyDTO } from '../dto/get-user-history.dto.js'
import { HistoryDTO } from '../dto/history.dto.js'
import { PushHistoryBodyDTO } from '../dto/push-history.dto.js'

export interface IHistoryController {
    pushHistory(dto: PushHistoryBodyDTO, userId: number): Promise<void>
    getUserHistory(dto: GetUserHistoryBodyDTO, userId: number): Promise<HistoryDTO>
}
