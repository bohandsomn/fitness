import { ConflictException, NotFoundException, Injectable, Inject, forwardRef } from '@nestjs/common'
import { User } from '@prisma/client'
import * as bcryptjs from 'bcryptjs'
import { CreateUserDTO } from '../dto/create-user.dto'
import { GetUserDTO } from '../dto/get-user.dto'
import { UserException } from '../constants/user.exception'
import { IUserService } from '../interfaces/user-service.interface'
import { UpdateUserDTO } from '../dto/update-user.dto'
import { ActivateUserDTO } from '../dto/activate-user.dto'
import { UserPayloadDTO } from '../dto/user-payload.dto'
import { CheckPasswordDTO } from '../dto/check-password.dto'
import { AssignAdminRoleDTO } from '../dto/assign-admin-role.dto'
import { UserRole } from '../constants/user.const'
import { OrmService } from '../../orm/services/orm.service'
import { ProgressService } from '../../progress/services/progress.service'

@Injectable()
export class UserService implements IUserService {
    constructor(
        private readonly ormService: OrmService,
        @Inject(forwardRef(() => ProgressService)) private readonly progressService: ProgressService,
    ) { }

    async createUser(dto: CreateUserDTO): Promise<User> {
        const candidate = await this.queryUser(dto)
        if (candidate) {
            throw new ConflictException(UserException.FOUND)
        }
        const { password, goalDate, birthday, ...data } = dto
        const hashPassword = await this.hashPassword(password)
        const user = await this.ormService.user.create({
            data: {
                ...data,
                goalDate: new Date(goalDate),
                birthday: new Date(birthday),
                password: hashPassword,
            }
        })
        return user
    }

    async updateUser(dto: UpdateUserDTO): Promise<User> {
        const user = await this.getUser({ id: dto.id })
        if (dto.email) {
            const candidate = await this.queryUser({ email: dto.email })
            if (candidate && (candidate.id !== user.id)) {
                throw new ConflictException(UserException.FOUND)
            }
        }
        await this.checkPassword({
            userId: user.id,
            password: dto.currentPassword
        })
        const { newPassword, id, currentPassword, goalDate, birthday, ...data } = dto
        const newHashPassword = newPassword
            ? await this.hashPassword(newPassword)
            : null
        const newUser = await this.ormService.user.update({
            where: {
                id: user.id,
            },
            data: {
                ...user,
                ...data,
                goalDate: goalDate ? new Date(goalDate) : goalDate,
                birthday: birthday ? new Date(birthday) : birthday,
                password: newHashPassword || user.password
            }
        })
        return newUser
    }

    async getUser(dto: GetUserDTO): Promise<User> {
        const user = await this.queryUser(dto)
        if (!user) {
            throw new NotFoundException(UserException.NOT_FOUND)
        }
        return user
    }

    async activateUser(dto: ActivateUserDTO): Promise<void> {
        const user = await this.getUser(dto)
        await this.ormService.user.update({
            where: {
                id: user.id,
            },
            data: {
                isActive: true,
            }
        })
    }

    async adaptUser(user: User): Promise<UserPayloadDTO> {
        const birthdayDate = new Date(user.birthday)
        const currentDate = new Date()
        const age = currentDate.getFullYear() - birthdayDate.getFullYear()
        const { lostCalories, goalCalories } = await this.progressService.getFullProgressInCalories({ userId: user.id })
        return {
            name: user.name,
            email: user.email,
            difficulty: user.difficulty,
            height: user.height,
            weight: user.weight,
            goalWeight: user.goalWeight,
            goalDate: user.goalDate,
            gender: user.gender,
            registeredAt: user.registeredAt,
            age,
            lostCalories,
            goalCalories,
        }
    }

    async checkPassword(dto: CheckPasswordDTO): Promise<void> {
        const user = await this.getUser({ id: dto.userId })
        const isValidPassword = await this.comparePassword(
            dto.password,
            user.password
        )
        if (!isValidPassword) {
            throw new ConflictException(UserException.NOT_VALID_PASSWORD)
        }
    }

    async assignAdminRole(dto: AssignAdminRoleDTO): Promise<User> {
        return this.ormService.user.update({
            where: {
                id: dto.userId
            },
            data: {
                role: UserRole.ADMIN
            }
        })
    }

    private async queryUser(dto: GetUserDTO): Promise<User | null> {
        const conditions: Partial<User>[] = []
        if (dto.id) {
            conditions.push({
                id: dto.id,
            })
        }
        if (dto.email) {
            conditions.push({
                email: dto.email,
            })
        }
        if (dto.link) {
            conditions.push({
                link: dto.link,
            })
        }
        if (conditions.length === 0) {
            return null
        }
        const user = await this.ormService.user.findFirst({
            where: {
                OR: conditions
            }
        })
        if (!user) {
            return null
        }
        return user
    }

    private async hashPassword(password: string): Promise<string> {
        const SALT = 5
        const hashPassword = await bcryptjs.hash(password, SALT)
        return hashPassword
    }

    private async comparePassword(
        password: string,
        hashPassword: string
    ): Promise<boolean> {
        const isValid = await bcryptjs.compare(password, hashPassword)
        return isValid
    }
}
