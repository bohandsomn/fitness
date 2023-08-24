import { UserDifficulty } from '../../user/constants/user.const'

export class GetRepetitionDTO {
    readonly exerciseId: number
    readonly difficulty: UserDifficulty
}
