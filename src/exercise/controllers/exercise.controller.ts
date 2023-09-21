import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ExerciseService } from '../services/exercise.service.js'
import { IExerciseController } from '../interfaces/exercise-controller.interface.js'
import { CreateExerciseBodyDTO } from '../dto/create-exercise.dto.js'
import { ExercisePayloadDTO } from '../dto/exercise-payload.dto.js'
import { UpdateExerciseBodyDTO } from '../dto/update-exercise.dto.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { ExerciseDTO } from '../dto/exercise.dto.js'
import { ImageDTO } from '../../image/dto/image.dto.js'
import { ImagePipe } from '../../image/pipes/image.pipe.js'
import { AuthGuard } from '../../auth/guards/auth.guard.js'
import { AdminRoleGuard } from '../../role/guards/admin-role.guard.js'
import { UserId } from '../../user/decorators/user.decorator.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { ParseOptionalIntPipe } from '../../common/pipes/parse-optional-int.pipe.js'
import { AppFileInterceptor } from '../../interceptors/app-file.interceptor.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'
import { BodyData } from '../../common/decorators/body-data.decorator.js'

@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController implements IExerciseController {
    constructor(
        private readonly exerciseService: ExerciseService
    ) { }

    @ApiOperation({ summary: 'Creating an exercise' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ExercisePayloadDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Post()
    @UseGuards(AuthGuard, AdminRoleGuard)
    @UseInterceptors(AppFileInterceptor())
    async createExercise(
        @BodyData(AppValidationPipe) dto: CreateExerciseBodyDTO,
        @UploadedFile(ImagePipe, AppValidationPipe) imageDTO: ImageDTO
    ): Promise<ExercisePayloadDTO> {
        return this.exerciseService.createExercise({ ...dto, image: imageDTO })
    }

    @ApiOperation({ summary: 'Updating an exercise' })
    @ApiResponse({ status: HttpStatus.OK, type: ExercisePayloadDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Put()
    @UseGuards(AuthGuard, AdminRoleGuard)
    @UseInterceptors(AppFileInterceptor())
    async updateExercise(
        @BodyData(AppValidationPipe) dto: UpdateExerciseBodyDTO,
        @UserId() userId: number,
        @UploadedFile(ImagePipe) imageDTO?: ImageDTO
    ): Promise<ExercisePayloadDTO> {
        return this.exerciseService.updateExercise({ ...dto, userId, image: imageDTO })
    }

    @ApiOperation({ summary: 'Receiving an exercise' })
    @ApiResponse({ status: HttpStatus.OK, type: ExerciseDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Get('/:exerciseId')
    @UseGuards(AuthGuard)
    async getOneExercise(
        @Param('exerciseId', ParseIntPipe) exerciseId: number,
        @UserId() userId: number
    ): Promise<ExerciseDTO> {
        return this.exerciseService.getOneExercise({ userId, id: exerciseId })
    }

    @ApiOperation({ summary: 'Receiving an exercises' })
    @ApiResponse({ status: HttpStatus.OK, type: [ExercisePayloadDTO] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @UseGuards(AuthGuard)
    @Get()
    async getManyExercises(
        @UserId() userId: number,
        @Query('setId', ParseOptionalIntPipe) setId?: number,
        @Query('header') header?: string,
        @Query('caloriesFrom', ParseOptionalIntPipe) caloriesFrom?: number,
        @Query('caloriesTo', ParseOptionalIntPipe) caloriesTo?: number,
        @Query('type') type?: string,
        @Query('bodyPart') bodyPart?: string,
    ): Promise<ExercisePayloadDTO[]> {
        return this.exerciseService.getManyExercises({
            userId,
            setId,
            header,
            caloriesFrom,
            caloriesTo,
            type,
            bodyPart,
        })
    }

    @ApiOperation({ summary: 'Deleting an exercise' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Delete('/:exerciseId')
    @UseGuards(AuthGuard, AdminRoleGuard)
    async deleteExercise(
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ): Promise<void> {
        return this.exerciseService.deleteExercise({ id: exerciseId })
    }
}
