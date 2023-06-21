import { ApiProperty } from '@nestjs/swagger'

export class GetCharacteristicsByExerciseDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly exerciseId: number
}
