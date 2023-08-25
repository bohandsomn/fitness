import { Set } from '@prisma/client'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'
import { ApiPropertySetCalories } from '../../common/decorators/api-property-set-calories'
import { ApiPropertySetDescription } from '../../common/decorators/api-property-set-description'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name'

export class SetDTO implements Partial<Set> {
    @ApiPropertySetId()
    readonly id: number

    @ApiPropertySetName()
    readonly name: string

    @ApiPropertySetDescription()
    readonly description: string

    @ApiPropertyDemonstration()
    readonly demonstration: string

    @ApiPropertySetCalories()
    readonly calories: number
}
