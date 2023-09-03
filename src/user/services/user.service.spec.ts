import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { OrmModule } from '../../orm/orm.module'
import { UserDifficulty, UserGender } from '../constants/user.const'
import { CreateUserDTO } from '../dto/create-user.dto'
import { User } from '@prisma/client'
import { UpdateUserDTO } from '../dto/update-user.dto'
import { GetUserDTO } from '../dto/get-user.dto'
import { ActivateUserDTO } from '../dto/activate-user.dto'
import { UserPayloadDTO } from '../dto/user-payload.dto'
import { CheckPasswordDTO } from '../dto/check-password.dto'
import { AppDate } from '../../common/services/app-date.service'

describe('UserService', () => {
    let service: UserService
    const user: User = {
        id: 1,
        name: 'name',
        email: 'email',
        difficulty: UserDifficulty.ADVANCED,
        height: 100,
        weight: 100,
        goalWeight: 50,
        goalDate: new AppDate(3000, 0, 1),
        gender: UserGender.MALE,
        registeredAt: new AppDate(Date.now()),
        link: '',
        password: '',
        isActive: false,
        refreshToken: '',
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [OrmModule],
            providers: [UserService],
            exports: [UserService],
        }).compile()

        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create user', async () => {
        const createUser: CreateUserDTO = {
            name: user.name,
            email: user.email,
            difficulty: user.difficulty,
            height: user.height,
            weight: user.weight,
            goalWeight: user.goalWeight,
            goalDate: user.goalDate,
            gender: user.gender,
            link: '',
            refreshToken: '',
            password: '',
        }
        jest.spyOn(service, 'createUser').mockImplementation(async () => user)
        expect(await service.createUser(createUser)).toEqual(user)
    })

    it('should update user', async () => {
        const updateUser: UpdateUserDTO = {
            id: 1,
            name: '',
            email: '',
            difficulty: UserDifficulty.ADVANCED,
            height: 100,
            weight: 100,
            goalWeight: 50,
            goalDate: new AppDate(3000, 0, 1),
            gender: UserGender.FEMALE,
            newPassword: '',
            currentPassword: '',
        }
        jest.spyOn(service, 'updateUser').mockImplementation(async () => user)
        expect(await service.updateUser(updateUser)).toEqual(user)
    })

    it('should get user', async () => {
        const getUser: GetUserDTO = {
            id: 1,
        }
        jest.spyOn(service, 'getUser').mockImplementation(async () => user)
        expect(await service.getUser(getUser)).toEqual(user)
    })

    it('should activate user', async () => {
        const activateUser: ActivateUserDTO = {
            link: '',
        }
        jest.spyOn(service, 'activateUser').mockImplementation(async () => undefined)
        expect(await service.activateUser(activateUser)).toBeUndefined()
    })

    it('should adapt user', () => {
        const userPayload: UserPayloadDTO = {
            name: user.name,
            email: user.email,
            difficulty: user.difficulty,
            height: user.height,
            weight: user.weight,
            goalWeight: user.goalWeight,
            goalDate: user.goalDate,
            gender: user.gender,
            registeredAt: user.registeredAt,
        }
        expect(service.adaptUser(user)).toEqual(userPayload)
    })

    it('should check user password', async () => {
        const checkPassword: CheckPasswordDTO = {
            password: '',
            userId: 1,
        }
        jest.spyOn(service, 'checkPassword').mockImplementation(async () => undefined)
        expect(await service.checkPassword(checkPassword)).toBeUndefined()
    })
})
