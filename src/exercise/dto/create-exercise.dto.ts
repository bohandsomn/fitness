import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto'
import { AppException } from '../../constants/app.exception'

export class CreateExerciseDTO {
    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly calories: number

    @ApiProperty({ example: 'Sit-ups', required: true, nullable: false, description: 'Exercise\'s name' })
    readonly header: string

    @ApiProperty({ example: 'Interesting fact', required: true, nullable: false, description: 'Exercise\'s description' })
    readonly description: string

    @ApiProperty({ type: ImageDTO })
    readonly image: ImageDTO

    @ApiProperty({ example: 20, required: true, nullable: false, description: 'Number of repetitions' })
    readonly beginnerRepetitions: number

    @ApiProperty({ example: 30, required: true, nullable: false, description: 'Number of repetitions' })
    readonly intermediateRepetitions: number

    @ApiProperty({ example: 40, required: true, nullable: false, description: 'Number of repetitions' })
    readonly advancedRepetitions: number
}

export class CreateExerciseBodyDTO {
    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly calories: number

    @ApiProperty({ example: 'Sit-ups', required: true, nullable: false, description: 'Exercise\'s name' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly header: string

    @ApiProperty({ example: 'Interesting fact', required: true, nullable: false, description: 'Exercise\'s description' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly description: string

    @ApiProperty({ example: 20, required: true, nullable: false, description: 'Number of repetitions' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly beginnerRepetitions: number

    @ApiProperty({ example: 30, required: true, nullable: false, description: 'Number of repetitions' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly intermediateRepetitions: number


    @ApiProperty({ example: 40, required: true, nullable: false, description: 'Number of repetitions' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly advancedRepetitions: number
}