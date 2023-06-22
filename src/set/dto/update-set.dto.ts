import { ApiProperty } from '@nestjs/swagger'
import { Set } from '@prisma/client'
import { ImageDTO } from '../../image/dto/image.dto'
import { IsNumber } from 'class-validator'
import { AppException } from 'src/app.exception'

export class UpdateSetDTO implements Partial<Set> {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    readonly id: number

    @ApiProperty({ example: 'For legs', required: false, nullable: true, description: 'Set\'s name' })
    readonly name?: string

    @ApiProperty({ example: 'Interesting fact', required: false, nullable: true, description: 'Set\'s description' })
    readonly description?: string

    @ApiProperty({ type: ImageDTO, required: false, nullable: true })
    readonly image?: ImageDTO

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number
}

export class UpdateSetBodyDTO implements Partial<Set> {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Set\'s id' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly id: number

    @ApiProperty({ example: 'For legs', required: false, nullable: true, description: 'Set\'s name' })
    readonly name?: string

    @ApiProperty({ example: 'Interesting fact', required: false, nullable: true, description: 'Set\'s description' })
    readonly description?: string
}
