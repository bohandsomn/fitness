import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { ApiHeaders, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BodyPartService } from '../services/body-part.service'
import { ICharacteristicController } from 'src/characteristic/interfaces/characteristic-controller.interface'
import { CharacteristicPreviewDTO } from 'src/characteristic/dto/characteristic-preview.dto'
import { CreateCharacteristicDTO } from 'src/characteristic/dto/create-characteristic.dto'
import { AdminRoleGuard } from 'src/role/guards/admin-role.guard'
import { AuthGuard } from 'src/auth/guards/auth.guard'
import { AppValidationPipe } from 'src/pipes/app-validation.pipe'
import { UpdateCharacteristicDTO } from 'src/characteristic/dto/update-characteristic.dto'
import { ValidationErrorResponseDTO } from 'src/error/dto/validation-error-response.dto'
import { ExceptionErrorResponseDTO } from 'src/error/dto/exception-error-response.dto'

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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Put()
    @UseGuards(AdminRoleGuard, AuthGuard)
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Delete('/:id')
    @UseGuards(AdminRoleGuard, AuthGuard)
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Patch('/add/:characteristicId/exercise/:exerciseId')
    @UseGuards(AdminRoleGuard, AuthGuard)
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
    @ApiHeaders([
        { name: 'authorization', description: 'The Authorization header is needed to get user payload from token' }
    ])
    @Patch('/remove/:characteristicId/exercise/:exerciseId')
    @UseGuards(AdminRoleGuard, AuthGuard)
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
