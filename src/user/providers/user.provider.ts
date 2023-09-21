import { Provider } from '@nestjs/common'
import { UserService } from '../services/user.service.js'

export const UserProvider: Provider = {
    provide: UserService,
    useClass: UserService,
}