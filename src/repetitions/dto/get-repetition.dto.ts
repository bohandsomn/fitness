import { UserDifficulty } from '../../user/user.const'

export class GetRepetitionDTO {
    readonly exerciseId: number
    readonly difficulty: UserDifficulty
}
