import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { firstValueFrom } from 'rxjs'
import type ImageKitClass from 'imagekit'
const ImageKit = require('imagekit') as ImageKitClass
import { CreateImageDTO } from './dto/create-image.dto'
import { GetUrlDTO } from './dto/get-url.dto'
import { DeleteImageDTO } from './dto/delete-image.dto'
import { IImageService } from './image-service.interface'
import { UpdateImageDTO } from './dto/update-image.dto'
import { GetBufferDTO } from './dto/get-buffer.dto'
import { LibService } from '../lib/lib.service'

@Injectable()
export class ImageService implements IImageService {
    private readonly imageKit: ImageKitClass

    constructor(
        private readonly configService: ConfigService,
        private readonly libService: LibService,
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {
        const publicKey = this.configService.getOrThrow('IMAGE_PUBLIC_KEY')
        const privateKey = this.configService.getOrThrow('IMAGE_PRIVATE_KEY')
        const urlEndpoint = this.configService.getOrThrow('IMAGE_URL_ENDPOINT')
        this.imageKit = new (ImageKit as any)({
            publicKey,
            privateKey,
            urlEndpoint,
        })
    }

    async createImage(dto: CreateImageDTO): Promise<string> {
        const link = this.libService.generateUniqueString()
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
