import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export const AppFileInterceptor = (localOptions?: MulterOptions) => FileInterceptor('file', localOptions)
