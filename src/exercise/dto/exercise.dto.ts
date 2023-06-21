import { ApiProperty } from '@nestjs/swagger'

export class ExerciseDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly id: number

    @ApiProperty({ example: 100, required: true, nullable: false, description: 'Integer calories' })
    readonly calories: number

    @ApiProperty({ example: 'Interesting fact', required: true, nullable: false, description: 'Exercise\'s description' })
    readonly description: string

    @ApiProperty({ example: 'Sit-ups', required: true, nullable: false, description: 'Exercise\'s name' })
    readonly header: string

    @ApiProperty({ example: '64918c8a06370748f2f3f7c3', required: true, nullable: false, description: 'Link, it leads to an image' })
    readonly demonstration: string
}
