import { Controller, Get, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Query, StreamableFile, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IImageController } from '../interfaces/image-controller.interface.js'
import { ImageInterceptor } from '../interceptors/image.interceptor.js'
import { IImageService } from '../interfaces/image-service.interface.js'
import { InjectImage } from '../decorators/inject-image.decorator.js'

@ApiTags('Image')
@Controller('image')
export class ImageController implements IImageController {
    constructor(
        @InjectImage() private readonly imageService: IImageService,
    ) { }

    @ApiOperation({ summary: 'Receiving an image' })
    @ApiResponse({ status: HttpStatus.OK, type: StreamableFile })
    @Get('/:demonstration')
    @UseInterceptors(ImageInterceptor)
    async getImage(
        @Param('demonstration') demonstration: string,
        @Query('w', ParseIntPipe) width: number,
        @Query('h', ParseIntPipe) height: number,
        @Query('q', ParseFloatPipe) quality: number,
    ): Promise<Buffer> {
        return this.imageService.get({
            demonstration,
            width,
            height,
            quality,
        })
    }
}
