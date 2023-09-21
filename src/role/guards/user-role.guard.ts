import { Injectable } from '@nestjs/common'
import { RoleGuard } from './role.guard.js'
import { UserRole } from '../../user/constants/user.const.js'

@Injectable()
export class UserRoleGuard extends RoleGuard {
    constructor() {
        super(UserRole.USER)
    }
}
