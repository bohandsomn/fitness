import { ApiProperty } from '@nestjs/swagger'

export class RemoveExerciseSetDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly exerciseId: number

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    readonly setId: number
}
