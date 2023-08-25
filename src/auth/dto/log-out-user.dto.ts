import { ApiPropertyToken } from '../../common/decorators/api-property-token'

export class LogOutUserDTO {
    @ApiPropertyToken()
    readonly refreshToken: string
}
