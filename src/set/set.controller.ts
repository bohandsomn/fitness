import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ISetController } from './set-controller.interface'
import { SetService } from './set.service'
import { CreateSetBodyDTO } from './dto/create-set.dto'
import { SetDTO } from './dto/set.dto'
import { ImageDTO } from '../image/dto/image.dto'
import { AppValidationPipe } from '../app-validation.pipe'
import { ImagePipe } from '../image/image.pipe'
import { User } from '../user/user.decorator'
import { UpdateSetBodyDTO } from './dto/update-set.dto'
import { SetPreviewDTO } from './dto/set-preview.dto'
import { ValidationErrorResponseDTO } from 'src/error/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from 'src/error/exception-error-response.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { SetRoleGuard } from 'src/role/set-role.guard'

@ApiTags('Set')
@Controller('set')
export class SetController implements ISetController {
    constructor(
        private readonly setService: SetService,
    ) { }

    @ApiOperation({ summary: 'Creating a set' })
    @ApiResponse({ status: HttpStatus.CREATED, type: SetPreviewDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    async createSet(
        @Body(AppValidationPipe) dto: CreateSetBodyDTO,
        @UploadedFile(ImagePipe) imageDTO: ImageDTO,
        @User('userId') userId: number
    ): Promise<SetPreviewDTO> {
        return this.setService.createSet({
            ...dto,
            image: imageDTO,
            userId,
        })
    }

    @ApiOperation({ summary: 'Updating a set' })
    @ApiResponse({ status: HttpStatus.OK, type: SetPreviewDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Put()
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(SetRoleGuard, AuthGuard)
    async updateSet(
        @Body(AppValidationPipe) dto: UpdateSetBodyDTO,
        @UploadedFile(ImagePipe) imageDTO: ImageDTO | undefined,
        @User('userId') userId: number
    ): Promise<SetPreviewDTO> {
        return this.setService.updateSet({
            ...dto,
            image: imageDTO,
            userId
        })
    }

    @ApiOperation({ summary: 'Receiving a set' })
    @ApiResponse({ status: HttpStatus.OK, type: SetDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Get('/:id')
    @UseGuards(AuthGuard)
    async getSet(
        @Param('id', ParseIntPipe) id: number,
        @User('userId') userId: number
    ): Promise<SetDTO> {
        return this.setService.getSet({
            id,
            userId
        })
    }

    @ApiOperation({ summary: 'Receiving a sets' })
    @ApiResponse({ status: HttpStatus.OK, type: [SetPreviewDTO] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Get()
    @UseGuards(AuthGuard)
    async getSets(
        @User('userId') userId: number
    ): Promise<SetPreviewDTO[]> {
        return this.setService.getSets({ userId })
    }

    @ApiOperation({ summary: 'Deleting a set' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Delete('/:id')
    @UseGuards(SetRoleGuard, AuthGuard)
    async deleteSet(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.setService.deleteSet({ id })
    }

    @ApiOperation({ summary: 'Adding an exercise to the set' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Patch('/add/:setId/exercise/:exerciseId')
    @UseGuards(AuthGuard)
    async addExerciseSet(
        @Param('exerciseId', ParseIntPipe) exerciseId: number,
        @Param('setId', ParseIntPipe) setId: number
    ): Promise<void> {
        return this.setService.addExerciseSet({
            exerciseId,
            setId,
        })
    }

    @ApiOperation({ summary: 'Removing an exercise from the set' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Patch('/remove/:setId/exercise/:exerciseId')
    @UseGuards(AuthGuard)
    async removeExerciseSet(
        @Param('exerciseId', ParseIntPipe) exerciseId: number,
        @Param('setId', ParseIntPipe) setId: number
    ): Promise<void> {
        return this.setService.removeExerciseSet({
            exerciseId,
            setId,
        })
    }
}
