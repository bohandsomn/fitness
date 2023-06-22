import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { LibService } from '../lib/lib.service'

@Injectable()
export class CreateUserPipe implements PipeTransform<Partial<CreateUserDTO>, Partial<CreateUserDTO>> {
    constructor(
        private readonly libService: LibService
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
            this.libService.checkUserGoalDate(goalDate)
        }
        return value
    }
}
