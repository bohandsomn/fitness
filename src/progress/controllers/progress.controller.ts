import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IProgressController } from '../interfaces/progress-controller.interface.js'
import { ProgressService } from '../services/progress.service.js'
import { GetProgressInCaloriesBodyDTO } from '../dto/get-progress-in-calories.dto.js'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { UserId } from '../../user/decorators/user.decorator.js'
import { AuthGuard } from '../../auth/guards/auth.guard.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'

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
    @ApiPropertyHeadersAuthorization()
    @Get()
    @UseGuards(AuthGuard)
    async getProgressInCalories(
        @Query(AppValidationPipe) dto: GetProgressInCaloriesBodyDTO,
        @UserId() userId: number
    ): Promise<ProgressInCaloriesDTO[]> {
        return this.progressService.getProgressInCalories({ ...dto, userId })
    }
}
