import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ImageController } from './controllers/image.controller'
import { ImageKitProvider } from './providers/image-kit.provider'

@Module({
  imports: [HttpModule],
  providers: [ImageKitProvider],
  exports: [ImageKitProvider],
  controllers: [ImageController],
})
export class ImageModule { }
