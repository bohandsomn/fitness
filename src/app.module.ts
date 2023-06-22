import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { JwtModule } from '@nestjs/jwt'
import * as redisStore from 'cache-manager-redis-store'
import * as path from 'path'
import type { RedisClientOptions } from 'redis'
import { OrmModule } from './orm/orm.module'
import { ColorLoggerModule } from './color-logger/color-logger.module'
import { ExerciseModule } from './exercise/exercise.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TokenModule } from './token/token.module'
import { LibModule } from './lib/lib.module'
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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'development'
                ? path.resolve(__dirname, '..', '.env.development')
                : path.resolve(__dirname, '..', '.env.production'),
        }),
        JwtModule.register({
            global: true,
        }),
        CacheModule.registerAsync<RedisClientOptions>({
            imports: [ConfigModule],
            useFactory(configService: ConfigService) {
                return {
                    store: redisStore as any,
                    url: configService.getOrThrow('REDIS_URL'),
                    ttl: parseInt(configService.getOrThrow('REDIS_TTL')),
                }
            },
            inject: [ConfigService],
            isGlobal: true,
        }),
        // CacheModule.register({
        //     isGlobal: true,
        // }),
        OrmModule,
        ColorLoggerModule,
        ExerciseModule,
        AuthModule,
        UserModule,
        TokenModule,
        LibModule,
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
