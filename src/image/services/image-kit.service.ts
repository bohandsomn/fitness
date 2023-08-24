import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import type ImageKitClass from 'imagekit'
const ImageKit = require('imagekit') as ImageKitClass
import { CreateImageDTO } from '../dto/create-image.dto'
import { GetUrlDTO } from '../dto/get-url.dto'
import { DeleteImageDTO } from '../dto/delete-image.dto'
import { IImageService } from '../interfaces/image-service.interface'
import { UpdateImageDTO } from '../dto/update-image.dto'
import { GetBufferDTO } from '../dto/get-buffer.dto'
import { CommonService } from '../../common/common.service'
import { Environment } from 'src/common/constants/environment'
import { InjectCacheManager } from 'src/cache/decorators/inject-cache-manager.decorator'
import { ICache } from 'src/cache/interfaces/cache.interface'

@Injectable()
export class ImageKitService implements IImageService {
    private readonly imageKit: ImageKitClass

    constructor(
        @InjectCacheManager() private readonly cacheManager: ICache,
        private readonly configService: ConfigService,
        private readonly commonService: CommonService,
        private readonly httpService: HttpService,
    ) {
        const publicKey = this.configService.getOrThrow(Environment.IMAGE_PUBLIC_KEY)
        const privateKey = this.configService.getOrThrow(Environment.IMAGE_PRIVATE_KEY)
        const urlEndpoint = this.configService.getOrThrow(Environment.IMAGE_URL_ENDPOINT)
        this.imageKit = new (ImageKit as any)({
            publicKey,
            privateKey,
            urlEndpoint,
        })
    }

    async createImage(dto: CreateImageDTO): Promise<string> {
        const link = this.commonService.generateUniqueString()
        const fileName = `${link}.${dto.extension}`
        const response = await this.imageKit.upload({
            file: dto.file,
            fileName,
        })
        const demonstration = response.fileId
        return demonstration
    }

    async updateImage(dto: UpdateImageDTO): Promise<string> {
        await this.deleteImage(dto)
        return this.createImage(dto)
    }

    async getUrl(dto: GetUrlDTO): Promise<string> {
        const details = await this.imageKit.getFileDetails(dto.demonstration)
        const url = this.imageKit.url({
            path: details.filePath,
            transformation: [{
                height: dto.height,
                width: dto.width,
                quality: dto.quality,
                format: 'webp'
            }]
        })
        return url
    }

    async getBuffer(dto: GetBufferDTO): Promise<Buffer> {
        const cachedBuffer = await this.cacheManager.get<Buffer>(dto.url)
        if (cachedBuffer) {
            return cachedBuffer
        }
        const response = await firstValueFrom(
            this.httpService.get<Buffer>(
                dto.url,
                {
                    responseType: 'arraybuffer'
                }
            )
        )
        const buffer = response.data
        await this.cacheManager.set(dto.url, buffer)
        return buffer
    }

    async deleteImage(dto: DeleteImageDTO): Promise<void> {
        await this.imageKit.deleteFile(dto.demonstration)
    }
}
