import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { Environment } from '../common/constants/environment.js'

@Global()
@Module({
    imports: [
        CacheManagerModule.register({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore as any,
                url: configService.getOrThrow(Environment.CACHING_URL),
                ttl: parseInt(configService.getOrThrow(Environment.CACHING_TTL)),
            }),
            inject: [ConfigService],
            isGlobal: true,
        }),
    ]
})
export class CacheModule { }
