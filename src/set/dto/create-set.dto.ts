import { ApiProperty } from '@nestjs/swagger'
import { Set } from '@prisma/client'
import { IsString } from 'class-validator'
import { ImageDTO } from '../../image/dto/image.dto'
import { AppException } from '../../app.exception'

export class CreateSetDTO implements Partial<Set> {
    @ApiProperty({ example: 'For legs', required: true, nullable: false, description: 'Set\'s name' })
    readonly name: string

    @ApiProperty({ example: 'Interesting fact', required: true, nullable: false, description: 'Set\'s description' })
    readonly description: string

    @ApiProperty({ type: ImageDTO })
    readonly image: ImageDTO

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number
}

export class CreateSetBodyDTO implements Partial<Set> {
    @ApiProperty({ example: 'For legs', required: true, nullable: false, description: 'Set\'s name' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly name: string

    @ApiProperty({ example: 'Interesting fact', required: true, nullable: false, description: 'Set\'s description' })
    @IsString({
        message: AppException.STRING_EMPTY
    })
    readonly description: string
}
