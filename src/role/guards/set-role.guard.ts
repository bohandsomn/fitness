import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { RoleException } from '../constants/role.exception'
import { AppRequest } from '../../auth/interfaces/app-request.interface'
import { SetService } from '../../set/services/set.service'

@Injectable()
export class SetRoleGuard implements CanActivate {
    constructor(
        private readonly setService: SetService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: AppRequest = context.switchToHttp().getRequest()
        const user = request.user
        if (!user) {
            throw new InternalServerErrorException(RoleException.AUTH_GUARD_IS_MISSING)
        }
        const userId = user.userId
        const bodySetId = (request.body.id as number | undefined)
        const paramSetId = (request.params.id as string | undefined) || (request.params.setId as string | undefined)
        const parsedParamSetId = typeof paramSetId === 'string' ? parseInt(paramSetId) : paramSetId
        const setId = bodySetId || parsedParamSetId
        if (!setId) {
            throw new InternalServerErrorException(RoleException.SET_ID_NOT_FOUND)
        }
        const isSetOwner = await this.setService.isSetOwner({ userId, setId })
        if (!isSetOwner) {
            throw new ForbiddenException(RoleException.USER_IS_NOW_SET_OWNER)
        }
        return true
    }
}
