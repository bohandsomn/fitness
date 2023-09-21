import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import * as path from 'path'
import { OrmModule } from './orm/orm.module.js'
import { ColorLoggerModule } from './color-logger/color-logger.module.js'
import { ExerciseModule } from './exercise/exercise.module.js'
import { AuthModule } from './auth/auth.module.js'
import { UserModule } from './user/user.module.js'
import { TokenModule } from './token/token.module.js'
import { MailModule } from './mail/mail.module.js'
import { ImageModule } from './image/image.module.js'
import { RepetitionsModule } from './repetitions/repetitions.module.js'
import { CharacteristicModule } from './characteristic/characteristic.module.js'
import { SetModule } from './set/set.module.js'
import { HistoryModule } from './history/history.module.js'
import { DateModule } from './date/date.module.js'
import { TypeModule } from './type/type.module.js'
import { BodyPartModule } from './body-part/body-part.module.js'
import { ProgressModule } from './progress/progress.module.js'
import { CacheModule } from './cache/cache.module.js'
import { CommonModule } from './common/common.module.js'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development'
                ? path.resolve(path.resolve(), '..', '.env.development')
                // DEBUG:
                // : path.resolve(__dirname, '..', '.env'),
                : path.resolve(path.resolve(), '..', '.env.production'),
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
