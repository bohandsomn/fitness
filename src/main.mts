import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module.js'
import { ColorLoggerInterceptor } from './color-logger/interceptors/color-logger.interceptor.js'
import { ColorLoggerService } from './color-logger/services/color-logger.service.js'
import { AppExceptionFilter } from './filters/app-exception.filter.mjs'
import { getSolution } from './common/functions/get-solution.function.mjs'

async function bootstrap() {
  try {
    const PORT = parseInt(process.env.PORT || '5000')
    const app = await NestFactory.create(AppModule)
    const colorLoggerService = new ColorLoggerService()
    app.use(cookieParser())
    app.enableCors({
      origin: process.env.CORS_ORIGIN?.split(',') || '*',
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
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      await getSolution(error)
    }
    throw error
  }
}

bootstrap()
