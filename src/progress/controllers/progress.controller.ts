import { Body, Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IProgressController } from '../interfaces/progress-controller.interface'
import { ProgressService } from '../services/progress.service'
import { GetProgressInCaloriesBodyDTO } from '../dto/get-progress-in-calories.dto'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto'
import { AppValidationPipe } from 'src/pipes/app-validation.pipe'
import { User } from 'src/user/decorstors/user.decorator'
import { AuthGuard } from 'src/auth/guards/auth.guard'
import { ValidationErrorResponseDTO } from 'src/error/dto/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from 'src/error/dto/exception-error-response.dto'

@ApiTags('Progress')
@Controller('progress')
export class ProgressController implements IProgressController {
    constructor(
        private readonly progressService: ProgressService
    ) { }

    @ApiOperation({ summary: 'Receiving progress in calories between two optional dates' })
    @ApiResponse({ status: HttpStatus.OK, type: [ProgressInCaloriesDTO] })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Get()
    @UseGuards(AuthGuard)
    async getProgressInCalories(
        @Query(AppValidationPipe) dto: GetProgressInCaloriesBodyDTO,
        @User('userId') userId: number
    ): Promise<ProgressInCaloriesDTO[]> {
        return this.progressService.getProgressInCalories({ ...dto, userId })
    }
}
