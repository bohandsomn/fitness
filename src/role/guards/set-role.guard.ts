import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { RoleException } from '../constants/role.exception.js'
import { AppRequest } from '../../auth/interfaces/app-request.interface.js'
import { SetService } from '../../set/services/set.service.js'

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
        const body = request.body
        const bodyData = body.data
        const params = request.params
        const bodySetId = (body.id as number | undefined)
        const parsedBodySetId = typeof bodyData === 'string'
            ? JSON.parse(bodyData)?.id as number | undefined
            : undefined
        const paramSetId = (params.id as string | undefined) || (params.setId as string | undefined)
        const parsedParamSetId = typeof paramSetId === 'string'
            ? parseInt(paramSetId)
            : undefined
        const setId = bodySetId || parsedBodySetId || parsedParamSetId
        if (!setId) {
            // DEBUG
            // throw new InternalServerErrorException(RoleException.SET_ID_NOT_FOUND)
            return true
        }
        const isSetOwner = await this.setService.isSetOwner({ userId, setId })
        if (!isSetOwner) {
            throw new ForbiddenException(RoleException.USER_IS_NOW_SET_OWNER)
        }
        return true
    }
}
