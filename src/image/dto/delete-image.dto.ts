import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration.js'

export class DeleteImageDTO {
    @ApiPropertyDemonstration()
    readonly demonstration: string
}