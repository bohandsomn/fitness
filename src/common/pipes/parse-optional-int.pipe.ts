import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata): number | void {
        if (typeof value !== 'string') {
            return
        }
        return parseInt(value)
    }
}
