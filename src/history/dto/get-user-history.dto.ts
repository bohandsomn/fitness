import { ApiProperty } from '@nestjs/swagger'

export class GetUserHistoryDTO {
    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ type: Date, example: new Date(), required: true, nullable: false, description: 'Date to retrieve history' })
    readonly date: Date
}
