import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto'
import { AppException } from '../../constants/app.exception'

export class UpdateExerciseDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly id: number

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ example: 100, required: false, nullable: true, description: 'Integer calories' })
    readonly calories?: number

    @ApiProperty({ example: 'Sit-ups', required: false, nullable: true, description: 'Exercise\'s name' })
    readonly header?: string

    @ApiProperty({ example: 'Interesting fact', required: false, nullable: true, description: 'Exercise\'s description' })
    readonly description?: string

    @ApiProperty({ type: ImageDTO, required: false, nullable: true })
    readonly image?: ImageDTO

    @ApiProperty({ example: 20, required: false, nullable: true, description: 'Number of repetitions' })
    readonly beginnerRepetitions?: number

    @ApiProperty({ example: 30, required: false, nullable: true, description: 'Number of repetitions' })
    readonly intermediateRepetitions?: number

    @ApiProperty({ example: 40, required: false, nullable: true, description: 'Number of repetitions' })
    readonly advancedRepetitions?: number
}

export class UpdateExerciseBodyDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly id: number

    @ApiProperty({ example: 100, required: false, nullable: true, description: 'Integer calories' })
    readonly calories?: number

    @ApiProperty({ example: 'Sit-ups', required: false, nullable: true, description: 'Exercise\'s name' })
    readonly header?: string

    @ApiProperty({ example: 'Interesting fact', required: false, nullable: true, description: 'Exercise\'s description' })
    readonly description?: string

    @ApiProperty({ example: 20, required: false, nullable: true, description: 'Number of repetitions' })
    readonly beginnerRepetitions?: number

    @ApiProperty({ example: 30, required: false, nullable: true, description: 'Number of repetitions' })
    readonly intermediateRepetitions?: number

    @ApiProperty({ example: 40, required: false, nullable: true, description: 'Number of repetitions' })
    readonly advancedRepetitions?: number
}
