import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { UserRole } from '../../user/constants/user.const'

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

    @ApiProperty({ example: 1, required: true, nullable: false, description: 'User\'s id' })
    readonly userId: number

    @ApiProperty({ example: true, required: true, nullable: false, description: 'A value that describes whether the user confirmed the email' })
    readonly isActive: boolean

    @ApiProperty({ enum: UserRole, example: UserRole.USER, required: true, nullable: false, description: 'User\'s role' })
    readonly role: Role
}
