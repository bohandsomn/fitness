import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration.js'
import { ApiPropertySetCalories } from '../../common/decorators/api-property-set-calories.js'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name.js'

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
