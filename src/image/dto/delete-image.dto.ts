import { ApiPropertyDemonstration } from '../../common/decorators/api-property-demonstration'

export class DeleteImageDTO {
    @ApiPropertyDemonstration()
    readonly demonstration: string
}