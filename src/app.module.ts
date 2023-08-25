import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import * as path from 'path'
import { OrmModule } from './orm/orm.module'
import { ColorLoggerModule } from './color-logger/color-logger.module'
import { ExerciseModule } from './exercise/exercise.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TokenModule } from './token/token.module'
import { MailModule } from './mail/mail.module'
import { ImageModule } from './image/image.module'
import { RepetitionsModule } from './repetitions/repetitions.module'
import { CharacteristicModule } from './characteristic/characteristic.module'
import { SetModule } from './set/set.module'
import { HistoryModule } from './history/history.module'
import { DateModule } from './date/date.module'
import { TypeModule } from './type/type.module'
import { BodyPartModule } from './body-part/body-part.module'
import { ProgressModule } from './progress/progress.module'
import { CacheModule } from './cache/cache.module'
import { CommonModule } from './common/common.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development'
                ? path.resolve(__dirname, '..', '.env.development')
                : path.resolve(__dirname, '..', '.env'),
        }),
        JwtModule.register({
            global: true,
        }),
        CacheModule,
        OrmModule,
        ColorLoggerModule,
        ExerciseModule,
        AuthModule,
        UserModule,
        TokenModule,
        CommonModule,
        MailModule,
        ImageModule,
        RepetitionsModule,
        CharacteristicModule,
        SetModule,
        HistoryModule,
        DateModule,
        TypeModule,
        BodyPartModule,
        ProgressModule
    ],
})
export class AppModule { }
