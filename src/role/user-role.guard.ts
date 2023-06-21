import { Injectable } from '@nestjs/common'
import { RoleGuard } from './role.guard'
import { UserRole } from '../user/user.const'

@Injectable()
export class UserRoleGuard extends RoleGuard {
    constructor() {
        super(UserRole.USER)
    }
}
