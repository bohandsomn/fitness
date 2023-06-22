import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { UpdateUserDTO } from './dto/update-user.dto'
import { UserService } from './user.service'
import { LibService } from '../lib/lib.service'

@Injectable()
export class UpdateUserPipe implements PipeTransform<Partial<UpdateUserDTO>, Promise<Partial<UpdateUserDTO>>> {
    constructor(
        private readonly libService: LibService,
        private readonly userService: UserService,
    ) { }

    async transform(
        value: Partial<UpdateUserDTO>,
        metadata: ArgumentMetadata
    ): Promise<Partial<UpdateUserDTO>> {
        const {
            id,
            gender,
            difficulty,
            height,
            weight,
            goalWeight,
            goalDate
        } = value
        const user = await this.userService.getUser({ id })
        if (gender) {
            this.libService.checkUserGender(gender)
        }
        if (difficulty) {
            this.libService.checkUserDifficulty(difficulty)
        }
        if (height) {
            this.libService.checkUserHeight(height)
        }
        if (weight) {
            this.libService.checkUserWeight(weight)
        }
        if (goalWeight) {
            this.libService.checkUserWeight(goalWeight)
        }
        if (weight && goalWeight) {
            this.libService.checkUserWeight(weight, goalWeight)
        }
        if (goalDate) {
            this.libService.checkUserGoalDate(goalDate, user.registeredAt)
        }
        return value
    }
}
