import { Body, Controller, Get, HttpStatus, Patch, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IHistoryController } from '../interfaces/history-controller.interface.js'
import { HistoryService } from '../services/history.service.js'
import { PushHistoryBodyDTO } from '../dto/push-history.dto.js'
import { AuthGuard } from '../../auth/guards/auth.guard.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { UserId } from '../../user/decorators/user.decorator.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { GetUserHistoryBodyDTO } from '../dto/get-user-history.dto.js'
import { HistoryDTO } from '../dto/history.dto.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'

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
    @ApiPropertyHeadersAuthorization()
    @Patch()
    @UseGuards(AuthGuard)
    async pushHistory(
        @Body(AppValidationPipe) dto: PushHistoryBodyDTO,
        @UserId() userId: number
    ): Promise<void> {
        return this.historyService.pushHistory({ ...dto, userId })
    }

    @ApiOperation({ summary: 'Receiving an user history' })
    @ApiResponse({ status: HttpStatus.OK, type: HistoryDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @UseGuards(AuthGuard)
    @Get()
    async getUserHistory(
        @Query() dto: GetUserHistoryBodyDTO,
        @UserId() userId: number
    ): Promise<HistoryDTO> {
        return this.historyService.getUserHistory({
            startDate: dto.date,
            endDate: dto.date,
            userId
        })
    }
}
