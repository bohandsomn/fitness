import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ColorLoggerInterceptor } from './color-logger/color-logger.interceptor'
import { ColorLoggerService } from './color-logger/color-logger.service'

async function bootstrap() {
  const PORT = parseInt(process.env.PORT || '3000')
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new ColorLoggerInterceptor(new ColorLoggerService()))
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
bootstrap()
