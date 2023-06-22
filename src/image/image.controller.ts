import { Controller, Get, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Query, StreamableFile, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IImageController } from './image-controller.interface'
import { ImageService } from './image.service'
import { ImageInterceptor } from './image.interceptor'

@ApiTags('Image')
@Controller('image')
export class ImageController implements IImageController {
    constructor(
        private readonly imageService: ImageService,
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
        const url = await this.imageService.getUrl({
            demonstration,
            width,
            height,
            quality,
        })
        return this.imageService.getBuffer({ url })
    }
}
