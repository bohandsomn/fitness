import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { UpdateUserDTO } from '../dto/update-user.dto.js'
import { UserService } from '../services/user.service.js'
import { CommonService } from '../../common/services/common.service.js'

@Injectable()
export class UpdateUserPipe implements PipeTransform<Partial<UpdateUserDTO>, Promise<Partial<UpdateUserDTO>>> {
    constructor(
        private readonly commonService: CommonService,
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
            this.commonService.checkUserGender(gender)
        }
        if (difficulty) {
            this.commonService.checkUserDifficulty(difficulty)
        }
        if (height) {
            this.commonService.checkUserHeight(height)
        }
        if (weight) {
            this.commonService.checkUserWeight(weight)
        }
        if (goalWeight) {
            this.commonService.checkUserWeight(goalWeight)
        }
        if (weight && goalWeight) {
            this.commonService.checkUserWeight(weight, goalWeight)
        }
        if (goalDate) {
            this.commonService.checkUserGoalDate(goalDate, user.registeredAt)
        }
        return value
    }
}
