import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BodyPartService } from '../services/body-part.service.js'
import { ICharacteristicController } from '../../characteristic/interfaces/characteristic-controller.interface.js'
import { CharacteristicPreviewDTO } from '../../characteristic/dto/characteristic-preview.dto.js'
import { CreateCharacteristicDTO } from '../../characteristic/dto/create-characteristic.dto.js'
import { AdminRoleGuard } from '../../role/guards/admin-role.guard.js'
import { AuthGuard } from '../../auth/guards/auth.guard.js'
import { AppValidationPipe } from '../../pipes/app-validation.pipe.js'
import { UpdateCharacteristicDTO } from '../../characteristic/dto/update-characteristic.dto.js'
import { ValidationErrorResponseDTO } from '../../error/dto/validation-error-response.dto.js'
import { ExceptionErrorResponseDTO } from '../../error/dto/exception-error-response.dto.js'
import { ApiPropertyHeadersAuthorization } from '../../common/decorators/api-headers-authorization.js'

@ApiTags('Body part')
@Controller('body-part')
export class BodyPartController implements ICharacteristicController {
    constructor(
        private readonly bodyPartService: BodyPartService
    ) { }

    @ApiOperation({ summary: 'Creating a body part' })
    @ApiResponse({ status: HttpStatus.CREATED, type: CharacteristicPreviewDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Post()
    @UseGuards(AuthGuard, AdminRoleGuard)
    async createCharacteristic(
        @Body(AppValidationPipe) dto: CreateCharacteristicDTO
    ): Promise<CharacteristicPreviewDTO> {
        return this.bodyPartService.createCharacteristic(dto)
    }

    @ApiOperation({ summary: 'Updating a body part' })
    @ApiResponse({ status: HttpStatus.OK, type: CharacteristicPreviewDTO })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ValidationErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Put()
    @UseGuards(AuthGuard, AdminRoleGuard)
    async updateCharacteristic(
        @Body(AppValidationPipe) dto: UpdateCharacteristicDTO
    ): Promise<CharacteristicPreviewDTO> {
        return this.bodyPartService.updateCharacteristic(dto)
    }

    @ApiOperation({ summary: 'Receiving a body part' })
    @ApiResponse({ status: HttpStatus.OK, type: CharacteristicPreviewDTO })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @Get('/:id')
    async getCharacteristic(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<CharacteristicPreviewDTO> {
        return this.bodyPartService.getCharacteristic({ id })
    }

    @ApiOperation({ summary: 'Receiving a body parts' })
    @ApiResponse({ status: HttpStatus.OK, type: [CharacteristicPreviewDTO] })
    @Get()
    async getCharacteristics(): Promise<CharacteristicPreviewDTO[]> {
        return this.bodyPartService.getCharacteristics()
    }

    @ApiOperation({ summary: 'Receiving body parts' })
    @ApiResponse({ status: HttpStatus.OK, type: [CharacteristicPreviewDTO] })
    @Get('/exercise/:exerciseId')
    async getCharacteristicsByExercise(
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ): Promise<CharacteristicPreviewDTO[]> {
        return this.bodyPartService.getCharacteristicsByExercise({ exerciseId })
    }

    @ApiOperation({ summary: 'Deleting a body part' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Delete('/:id')
    @UseGuards(AuthGuard, AdminRoleGuard)
    async deleteCharacteristic(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.bodyPartService.deleteCharacteristic({ id })
    }

    @ApiOperation({ summary: 'Adding a body part to the exercise' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Patch('/add/:characteristicId/exercise/:exerciseId')
    @UseGuards(AuthGuard, AdminRoleGuard)
    async addCharacteristic(
        @Param('characteristicId', ParseIntPipe) characteristicId: number,
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ): Promise<void> {
        return this.bodyPartService.addCharacteristic({
            characteristicId,
            exerciseId,
        })
    }

    @ApiOperation({ summary: 'Removing a body part from the exercise' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.CONFLICT, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, type: ExceptionErrorResponseDTO })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ExceptionErrorResponseDTO })
    @ApiPropertyHeadersAuthorization()
    @Patch('/remove/:characteristicId/exercise/:exerciseId')
    @UseGuards(AuthGuard, AdminRoleGuard)
    async removeCharacteristic(
        @Param('characteristicId', ParseIntPipe) characteristicId: number,
        @Param('exerciseId', ParseIntPipe) exerciseId: number
    ): Promise<void> {
        return this.bodyPartService.removeCharacteristic({
            characteristicId,
            exerciseId,
        })
    }
}
