export interface IImageController {
    getImage(
        demonstration: string,
        width: number,
        height: number,
        quality: number
    ): Promise<Buffer>
}
