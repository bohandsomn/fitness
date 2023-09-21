import { ApiPropertyToken } from '../../common/decorators/api-property-token.js'

export class LogOutUserDTO {
    @ApiPropertyToken()
    readonly refreshToken: string
}
