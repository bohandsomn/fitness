import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto'
import { AppException } from '../../constants/app.exception'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header'
import { ApiPropertyExerciseDescription } from '../../common/decorators/api-property-exercise-description'
import { ApiPropertyRepetitions } from '../../common/decorators/api-property-repetitions'

export class CreateExerciseDTO {
    @ApiPropertyCalories()
    readonly calories: number

    @ApiPropertyExerciseHeader()
    readonly header: string

    @ApiPropertyExerciseDescription()
    readonly description: string

    @ApiProperty({ type: ImageDTO })
    readonly image: ImageDTO

    @ApiPropertyRepetitions({ example: 20 })
    readonly beginnerRepetitions: number

    @ApiPropertyRepetitions({ example: 30 })
    readonly intermediateRepetitions: number

    @ApiPropertyRepetitions({ example: 40 })
    readonly advancedRepetitions: number
}

export class CreateExerciseBodyDTO {
    @ApiPropertyCalories()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly calories: number

    @ApiPropertyExerciseHeader()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly header: string

    @ApiPropertyExerciseDescription()
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly description: string

    @ApiPropertyRepetitions()
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly beginnerRepetitions: number

    @ApiPropertyRepetitions({ example: 30 })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly intermediateRepetitions: number


    @ApiPropertyRepetitions({ example: 40 })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly advancedRepetitions: number
}