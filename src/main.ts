import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { ColorLoggerInterceptor } from './color-logger/color-logger.interceptor'
import { ColorLoggerService } from './color-logger/color-logger.service'
import { AppExceptionFilter } from './app-exception.filter'

async function bootstrap() {
  const PORT = parseInt(process.env.PORT || '5000')
  const app = await NestFactory.create(AppModule)
  const colorLoggerService = new ColorLoggerService()
  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.CLIENT_LINK || '*'],
    credentials: true,
  })
  app.useGlobalInterceptors(new ColorLoggerInterceptor(colorLoggerService))
  app.useGlobalFilters(new AppExceptionFilter(colorLoggerService))

  const config = new DocumentBuilder()
    .setTitle('Fitness documentation')
    .setDescription('The fitness API is needed to understand which endpoints exist for The fitness application, who has the right to call them, and what types of input and output data.')
    .setVersion('1.2')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('', app, document)

  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
bootstrap()
