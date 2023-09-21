import { Role } from '@prisma/client'
import { ApiPropertyUserId } from '../../common/decorators/api-property-user-id.js'
import { ApiPropertyRole } from '../../common/decorators/api-property-role.js'
import { ApiPropertyUserIsActive } from '../../common/decorators/api-property-user-is-active.js'

export class GenerateTokenDTO {
    static isGenerateTokenDTO(data: unknown): data is GenerateTokenDTO {
        if (typeof data !== 'object' || data === null) {
            return false
        }
        if (
            typeof (data as GenerateTokenDTO).userId !== 'number' ||
            typeof (data as GenerateTokenDTO).isActive !== 'boolean'
        ) {
            return false
        }
        return true
    }

    @ApiPropertyUserId()
    readonly userId: number

    @ApiPropertyUserIsActive()
    readonly isActive: boolean

    @ApiPropertyRole()
    readonly role: Role
}
