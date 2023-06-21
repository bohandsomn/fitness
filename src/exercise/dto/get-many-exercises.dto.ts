import { ApiProperty } from '@nestjs/swagger'

export class GetManyExercisesDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ example: 1, required: false, nullable: true, description: 'Set\'s id' })
    readonly setId?: number

    @ApiProperty({ example: 'Sit-ups', required: false, nullable: true, description: 'Exercise\'s name' })
    readonly header?: string

    @ApiProperty({ example: 100, required: false, nullable: true, description: 'Integer calories' })
    readonly caloriesFrom?: number

    @ApiProperty({ example: 100, required: false, nullable: true, description: 'Integer calories' })
    readonly caloriesTo?: number

    @ApiProperty({ example: 'Cardio', required: true, nullable: false, description: 'Characteristic\'s value' })
    readonly type?: string

    @ApiProperty({ example: 'Legs', required: true, nullable: false, description: 'Characteristic\'s value' })
    readonly bodyPart?: string
}
