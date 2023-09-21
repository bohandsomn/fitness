import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ImageController } from './controllers/image.controller.js'
import { ImageKitProvider } from './providers/image-kit.provider.js'

@Module({
  imports: [HttpModule],
  providers: [ImageKitProvider],
  exports: [ImageKitProvider],
  controllers: [ImageController],
})
export class ImageModule { }
