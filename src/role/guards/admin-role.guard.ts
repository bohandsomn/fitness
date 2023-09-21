import { Injectable } from '@nestjs/common'
import { RoleGuard } from './role.guard.js'
import { UserRole } from '../../user/constants/user.const.js'

@Injectable()
export class AdminRoleGuard extends RoleGuard {
    constructor() {
        super(UserRole.ADMIN)
    }
}
