import { Injectable } from '@nestjs/common'
import { RoleGuard } from './role.guard'
import { UserRole } from '../../user/constants/user.const'

@Injectable()
export class AdminRoleGuard extends RoleGuard {
    constructor() {
        super(UserRole.ADMIN)
    }
}
