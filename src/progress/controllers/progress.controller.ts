import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IProgressController } from '../interfaces/progress-controller.interface'
import { ProgressService } from '../services/progress.service'
import { GetProgressInCaloriesBodyDTO } from '../dto/get-progress-in-calories.dto'
import { ProgressInCaloriesDTO } from '../dto/progress-in-calories.dto'
import { AppValidationPipe } from '../../pipes/app-validation.pipe'
import { UserId } from '../../user/decorators/user.decorator'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization'

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
