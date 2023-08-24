import { Module, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { Environment } from 'src/common/constants/environment'

@Global()
@Module({
    imports: [
        CacheManagerModule.register({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore as any,
                url: configService.getOrThrow(Environment.REDIS_URL),
                ttl: parseInt(configService.getOrThrow(Environment.REDIS_TTL)),
            }),
            inject: [ConfigService],
            isGlobal: true,
        }),
    ]
})
export class CacheModule { }
