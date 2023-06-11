import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrmModule } from './orm/orm.module'
import { ColorLoggerModule } from './color-logger/color-logger.module'

@Module({
    imports: [OrmModule, ColorLoggerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
