import { Body, Controller, HttpStatus, Patch, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IHistoryController } from './history-controller.interface'
import { HistoryService } from './history.service'
import { PushHistoryBodyDTO } from './dto/push-history.dto'
import { AuthGuard } from '../auth/auth.guard'
import { AppValidationPipe } from '../app-validation.pipe'
import { User } from '../user/user.decorator'
import { ValidationErrorResponseDTO } from 'src/error/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from 'src/error/exception-error-response.dto'

@ApiTags('History')
@Controller('history')
export class HistoryController implements IHistoryController {
    constructor(
        private readonly historyService: HistoryService
    ) { }

    @ApiOperation({ summary: 'Pushing history' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Patch()
    @UseGuards(AuthGuard)
    async pushHistory(
        @Body(AppValidationPipe) dto: PushHistoryBodyDTO,
        @User('userId') userId: number
    ): Promise<void> {
        return this.historyService.pushHistory({ ...dto, userId })
    }
}
