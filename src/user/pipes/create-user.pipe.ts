import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { CreateUserDTO } from '../dto/create-user.dto'
import { CommonService } from '../../common/services/common.service'

@Injectable()
export class CreateUserPipe implements PipeTransform<Partial<CreateUserDTO>, Partial<CreateUserDTO>> {
    constructor(
        private readonly commonService: CommonService
    ) { }

    transform(
        value: Partial<CreateUserDTO>,
        metadata: ArgumentMetadata
    ): Partial<CreateUserDTO> {
        const {
            difficulty,
            height,
            weight,
            goalWeight,
            goalDate,
            gender,
        } = value
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
            this.commonService.checkUserGoalDate(goalDate)
        }
        return value
    }
}
