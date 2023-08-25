import { ApiProperty } from '@nestjs/swagger'
import { ApiPropertyCalories } from '../../common/decorators/api-property-calories'
import { ApiPropertyCharacteristicValue } from '../../common/decorators/api-property-characteristic-value'
import { ApiPropertyExerciseHeader } from '../../common/decorators/api-property-exercise-header'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id'

export class GetManyExercisesDTO {
    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertySetId({ required: false, nullable: true })
    readonly setId?: number

    @ApiPropertyExerciseHeader({ required: false, nullable: true })
    readonly header?: string

    @ApiPropertyCalories({ required: false, nullable: true })
    readonly caloriesFrom?: number

    @ApiPropertyCalories({ required: false, nullable: true })
    readonly caloriesTo?: number

    @ApiPropertyCharacteristicValue({ example: 'Cardio', required: true, nullable: false })
    readonly type?: string

    @ApiPropertyCharacteristicValue({ required: false, nullable: true })
    readonly bodyPart?: string
}
