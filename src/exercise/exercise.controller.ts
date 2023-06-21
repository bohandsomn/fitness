import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ExerciseService } from './exercise.service'
import { IExerciseController } from './exercise-controller.interface'
import { CreateExerciseBodyDTO } from './dto/create-exercise.dto'
import { ExercisePayloadDTO } from './dto/exercise-payload.dto'
import { UpdateExerciseBodyDTO } from './dto/update-exercise.dto'
import { ImageDTO } from '../image/dto/image.dto'
import { AppValidationPipe } from '../app-validation.pipe'
import { ImagePipe } from '../image/image.pipe'
import { AuthGuard } from '../auth/auth.guard'
import { AdminRoleGuard } from '../role/admin-role.guard'
import { User } from '../user/user.decorator'
import { ValidationErrorResponseDTO } from 'src/error/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from 'src/error/exception-error-response.dto'
import { ExerciseDTO } from './dto/exercise.dto'

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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Post()
    @UseGuards(AdminRoleGuard, AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createExercise(
        @Body(AppValidationPipe) dto: CreateExerciseBodyDTO,
        @UploadedFile(ImagePipe) imageDTO: ImageDTO
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Put()
    @UseGuards(AdminRoleGuard, AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateExercise(
        @Body(AppValidationPipe) dto: UpdateExerciseBodyDTO,
        @User('userId') userId: number,
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Get('/:exerciseId')
    @UseGuards(AuthGuard)
    async getOneExercise(
        @Param('exerciseId', ParseIntPipe) exerciseId: number,
        @User('userId') userId: number
    ): Promise<ExerciseDTO> {
        return this.exerciseService.getOneExercise({ userId, id: exerciseId })
    }

    @ApiOperation({ summary: 'Receiving an exercises' })
    @ApiResponse({ status: HttpStatus.OK, type: [ExercisePayloadDTO] })
    @Get()
    async getManyExercises(
        @Query('setId', ParseIntPipe) setId?: number,
        @Query('header') header?: string,
        @Query('caloriesFrom', ParseIntPipe) caloriesFrom?: number,
        @Query('caloriesTo', ParseIntPipe) caloriesTo?: number,
        @Query('type') type?: string,
        @Query('bodyPart') bodyPart?: string,
    ): Promise<ExercisePayloadDTO[]> {
        return this.exerciseService.getManyExercises({
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Delete('/:exerciseId')
    @UseGuards(AdminRoleGuard, AuthGuard)
    async deleteExercise(
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ): Promise<void> {
        return this.exerciseService.deleteExercise({ id: exerciseId })
    }
}
