import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { RoleException } from '../constants/role.exception.js'
import { Environment } from '../../common/constants/environment.js'

@Injectable()
export class AssignRoleGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const headers = request.headers
        const assignHeader = headers.assign
        if (!assignHeader) {
            throw new ForbiddenException(RoleException.THERE_IS_NOT_ASSIGN_HEADER)
        }
        const serverAssignHeader = this.configService.getOrThrow(Environment.ASSIGN_HEADER)
        if (assignHeader !== serverAssignHeader) {
            throw new ForbiddenException(RoleException.ASSIGN_HEADER_IS_NOT_VALID)
        }
        return true
    }
}
