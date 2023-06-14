import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { OrmModule } from './orm/orm.module'
import { ColorLoggerModule } from './color-logger/color-logger.module'
import { ExerciseModule } from './exercise/exercise.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TokenModule } from './token/token.module'
import { LibModule } from './lib/lib.module'
import { MailModule } from './mail/mail.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.register({
            global: true,
        }),
        OrmModule,
        ColorLoggerModule,
        ExerciseModule,
        AuthModule,
        UserModule,
        TokenModule,
        LibModule,
        MailModule
    ],
})
export class AppModule { }
