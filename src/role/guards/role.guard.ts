import { CanActivate, ExecutionContext, InternalServerErrorException, ForbiddenException } from '@nestjs/common'
import { RoleException } from '../constants/role.exception.js'
import { AppRequest } from '../../auth/interfaces/app-request.interface.js'
import { UserRole } from '../../user/constants/user.const.js'

export abstract class RoleGuard implements CanActivate {
    constructor(
        private readonly role: UserRole
    ) { }

    async canActivate(context: ExecutionContext): Promise<true> {
        const request: AppRequest = context.switchToHttp().getRequest()
        const user = request.user
        if (!user) {
            throw new InternalServerErrorException(RoleException.AUTH_GUARD_IS_MISSING)
        }
        if (user.role !== this.role) {
            throw new ForbiddenException(RoleException.DO_NOT_HAVE_ACCESS)
        }
        return true
    }
}
