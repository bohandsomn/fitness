import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'
import { ApiPropertySetCalories } from '../../common/decorators/api-property-set-calories'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name'

export class SetPreviewDTO {
    @ApiPropertySetId()
    readonly id: number

    @ApiPropertySetName()
    readonly name: string

    @ApiPropertyDemonstration()
    readonly demonstration: string

    @ApiPropertySetCalories()
    readonly calories: number
}
