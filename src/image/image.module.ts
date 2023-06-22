import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ImageService } from './image.service'
import { ImageController } from './image.controller'

@Module({
  imports: [HttpModule],
  providers: [ImageService],
  exports: [ImageService],
  controllers: [ImageController],
})
export class ImageModule { }
