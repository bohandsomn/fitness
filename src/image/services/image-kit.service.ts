import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import ImageKit from 'imagekit'
import { CreateImageDTO } from '../dto/create-image.dto.js'
import { GetImageDTO } from '../dto/get-image.dto.js'
import { DeleteImageDTO } from '../dto/delete-image.dto.js'
import { IImageService } from '../interfaces/image-service.interface.js'
import { UpdateImageDTO } from '../dto/update-image.dto.js'
import { CommonService } from '../../common/services/common.service.js'
import { Environment } from '../../common/constants/environment.js'
import { InjectCacheManager } from '../../cache/decorators/inject-cache-manager.decorator.js'
import { ICache } from '../../cache/interfaces/cache.interface.js'
import { AppException } from '../../constants/app.exception.js'

@Injectable()
export class ImageKitService implements IImageService, OnModuleInit {
    private _imageKit: ImageKit | null

    constructor(
        @InjectCacheManager() private readonly cacheManager: ICache,
        private readonly configService: ConfigService,
        private readonly commonService: CommonService,
        private readonly httpService: HttpService,
    ) { }

    async create(dto: CreateImageDTO): Promise<string> {
        try {
            const link = this.commonService.generateUniqueString()
            const fileName = `${link}.${dto.extension}`
            const response = await this.imageKit.upload({
                file: dto.file,
                fileName,
            })
            const demonstration = response.fileId
            return demonstration
        } catch (error) {
            throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR, error)
        }
    }

    async update(dto: UpdateImageDTO): Promise<string> {
        try {
            await this.delete(dto)
            return this.create(dto)
        } catch (error) {
            throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR, error)
        }
    }

    async get(dto: GetImageDTO): Promise<Buffer> {
        try {
            const url = await this.getUrl(dto)
            const cachedBuffer = await this.cacheManager.get<Buffer>(url)
            if (cachedBuffer) {
                return cachedBuffer
            }
            const response = await firstValueFrom(
                this.httpService.get<Buffer>(
                    url,
                    {
                        responseType: 'arraybuffer'
                    }
                )
            )
            const buffer = response.data
            await this.cacheManager.set(url, buffer)
            return buffer
        } catch (error) {
            throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR, error)
        }
    }

    async delete(dto: DeleteImageDTO): Promise<void> {
        try {
            await this.imageKit.deleteFile(dto.demonstration)
        } catch (error) {
            throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR, error)
        }
    }

    private async getUrl(dto: GetImageDTO): Promise<string> {
        try {
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
        } catch (error) {
            throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR, error)
        }
    }

    private get imageKit(): ImageKit {
        if (!this._imageKit) {
            throw new InternalServerErrorException(AppException.INTERNAL_SERVER_ERROR)
        }
        return this._imageKit
    }

    onModuleInit() {
        const publicKey = this.configService.getOrThrow(Environment.IMAGE_PUBLIC_KEY)
        const privateKey = this.configService.getOrThrow(Environment.IMAGE_PRIVATE_KEY)
        const urlEndpoint = this.configService.getOrThrow(Environment.IMAGE_URL_ENDPOINT)
        this._imageKit = new ImageKit({
            publicKey,
            privateKey,
            urlEndpoint,
        })
    }
}
