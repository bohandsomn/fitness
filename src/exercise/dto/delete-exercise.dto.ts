import { ApiProperty } from '@nestjs/swagger'

export class DeleteExerciseDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly id: number
}
