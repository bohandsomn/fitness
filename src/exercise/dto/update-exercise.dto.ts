import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto.js'
import { AppException } from '../../constants/app.exception.js'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'
import { ApiPropertyExerciseId } from '../../common/decorators/api-property-exercise-id.js'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories.js'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header.js'
import { ApiPropertyExerciseDescription } from '../../common/decorators/api-property-exercise-description.js'
import { ApiPropertyRepetitions } from '../../common/decorators/api-property-repetitions.js'

export class UpdateExerciseDTO {
    @ApiPropertyExerciseId()
    readonly id: number

    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyCalories({ required: false, nullable: true })
    readonly calories?: number

    @ApiPropertyExerciseHeader({ required: false, nullable: true })
    readonly header?: string

    @ApiPropertyExerciseDescription({ required: false, nullable: true })
    readonly description?: string

    @ApiProperty({ type: ImageDTO, required: false, nullable: true })
    readonly image?: ImageDTO

    @ApiPropertyRepetitions({ example: 20, required: false, nullable: true })
    readonly beginnerRepetitions?: number

    @ApiPropertyRepetitions({ example: 30, required: false, nullable: true })
    readonly intermediateRepetitions?: number

    @ApiPropertyRepetitions({ example: 40, required: false, nullable: true })
    readonly advancedRepetitions?: number
}

export class UpdateExerciseBodyDTO {
    @ApiPropertyExerciseId()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly id: number

    @ApiPropertyCalories({ required: false, nullable: true })
    readonly calories?: number

    @ApiPropertyExerciseHeader({ required: false, nullable: true })
    readonly header?: string

    @ApiPropertyExerciseDescription({ required: false, nullable: true })
    readonly description?: string

    @ApiPropertyRepetitions({ example: 20, required: false, nullable: true })
    readonly beginnerRepetitions?: number

    @ApiPropertyRepetitions({ example: 30, required: false, nullable: true })
    readonly intermediateRepetitions?: number

    @ApiPropertyRepetitions({ example: 40, required: false, nullable: true })
    readonly advancedRepetitions?: number
}
