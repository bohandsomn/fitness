import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ColorLoggerInterceptor } from './color-logger/color-logger.interceptor'
import { ColorLoggerService } from './color-logger/color-logger.service'
import { AppExceptionFilter } from './app-exception.filter'

async function bootstrap() {
  const PORT = parseInt(process.env.PORT || '3000')
  const app = await NestFactory.create(AppModule)
  const colorLoggerService = new ColorLoggerService()
  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.CLIENT_LINK || '*'],
    credentials: true,
  })
  app.useGlobalInterceptors(new ColorLoggerInterceptor(colorLoggerService))
  app.useGlobalFilters(new AppExceptionFilter(colorLoggerService))
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
bootstrap()
