import { Inject, forwardRef } from '@nestjs/common'
import { UserService } from '../services/user.service.js'

export const InjectUser = () => Inject(forwardRef(() => UserService))