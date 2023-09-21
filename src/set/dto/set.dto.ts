import { Set } from '@prisma/client'
import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration.js'
import { ApiPropertySetCalories } from '../../common/decorators/api-property-set-calories.js'
import { ApiPropertySetDescription } from '../../common/decorators/api-property-set-description.js'
import { ApiPropertySetId } from '../../common/decorators/api-property-set-id.js'
import { ApiPropertySetName } from '../../common/decorators/api-property-set-name.js'
import { ApiPropertySetIsOwner } from '../../common/decorators/api-property-set-is-owner.js'

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

    @ApiPropertySetIsOwner()
    readonly isOwner: boolean
}
