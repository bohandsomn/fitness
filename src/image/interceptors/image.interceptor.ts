import { CallHandler, ExecutionContext, Injectable, NestInterceptor, StreamableFile } from '@nestjs/common'
import { map } from 'rxjs'

@Injectable()
export class ImageInterceptor implements NestInterceptor<string, StreamableFile> {
    intercept(context: ExecutionContext, next: CallHandler<string>) {
        return next
            .handle()
            .pipe(
                map(
                    (data) => new StreamableFile(
                        (Buffer.from as any)(data, 'binary'),
                        {
                            type: 'image'
                        }
                    )
                )
            )
    }
}
