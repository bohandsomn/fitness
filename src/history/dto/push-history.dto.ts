import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { AppException } from 'src/app.exception'

export class PushHistoryDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    readonly exerciseId: number
}

export class PushHistoryBodyDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'Exercise\'s id' })
    @IsNumber({}, {
        message: AppException.NUMBER_NOT_VALID
    })
    readonly exerciseId: number
}
