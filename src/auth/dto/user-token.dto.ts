import { UserPayloadDTO } from '../../user/dto/user-payload.dto'

export class UserTokenDTO {
    readonly user: UserPayloadDTO
    readonly accessToken: string
}
