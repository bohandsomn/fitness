import { ApiPropertyToken } from '../../common/decorators/api-property-token'

export class DeleteTokenDTO {
    @ApiPropertyToken()
    readonly refreshToken: string
}
