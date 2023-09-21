import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ISetController } from '../interfaces/set-controller.interface.js'
import { SetService } from '../services/set.service.js'
import { CreateSetBodyDTO } from '../dto/create-set.dto.js'
import { SetDTO } from '../dto/set.dto.js'
import { ImageDTO } from '../../image/dto/image.dto.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { ImagePipe } from '../../image/pipes/image.pipe.js'
import { User, UserId } from '../../user/decorators/user.decorator.js'
import { UpdateSetBodyDTO } from '../dto/update-set.dto.js'
import { SetPreviewDTO } from '../dto/set-preview.dto.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { AuthGuard } from '../../auth/guards/auth.guard.js'
import { SetRoleGuard } from '../../role/guards/set-role.guard.js'
import { AppFileInterceptor } from '../../interceptors/app-file.interceptor.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'
import { BodyData } from '../../common/decorators/body-data.decorator.js'

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
    @ApiPropertyHeadersAuthorization()
    @Post()
    @UseInterceptors(AppFileInterceptor())
    @UseGuards(AuthGuard)
    async createSet(
        @BodyData(AppValidationPipe) dto: CreateSetBodyDTO,
        @UploadedFile(ImagePipe) imageDTO: ImageDTO,
        @UserId() userId: number,
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
    @ApiPropertyHeadersAuthorization()
    @Put()
    @UseInterceptors(AppFileInterceptor())
    @UseGuards(AuthGuard, SetRoleGuard)
    async updateSet(
        @BodyData(AppValidationPipe) dto: UpdateSetBodyDTO,
        @UploadedFile(ImagePipe) imageDTO: ImageDTO | undefined,
        @UserId() userId: number
    ): Promise<SetPreviewDTO> {
        return this.setService.updateSet({
            ...dto,
            image: imageDTO,
            userId
        })
    }

    @ApiOperation({ summary: 'Receiving a common sets' })
    @ApiResponse({ status: HttpStatus.OK, type: [SetPreviewDTO] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @UseGuards(AuthGuard)
    @Get('/common')
    async getCommonSets(
        @UserId() userId: number
    ): Promise<SetPreviewDTO[]> {
        return this.setService.getCommonSets({ userId })
    }

    @ApiOperation({ summary: 'Receiving a set' })
    @ApiResponse({ status: HttpStatus.OK, type: SetDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Get('/:id')
    @UseGuards(AuthGuard)
    async getSet(
        @Param('id', ParseIntPipe) id: number,
        @UserId() userId: number
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
    @ApiPropertyHeadersAuthorization()
    @Get()
    @UseGuards(AuthGuard)
    async getSets(
        @UserId() userId: number
    ): Promise<SetPreviewDTO[]> {
        return this.setService.getSets({ userId })
    }

    @ApiOperation({ summary: 'Deleting a set' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Delete('/:id')
    @UseGuards(AuthGuard, SetRoleGuard)
    async deleteSet(
        @Param('id', ParseIntPipe) id: number,
        @UserId() userId: number,
    ): Promise<void> {
        return this.setService.deleteSet({ id, userId })
    }

    @ApiOperation({ summary: 'Adding an exercise to the set' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
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
    @ApiPropertyHeadersAuthorization()
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
