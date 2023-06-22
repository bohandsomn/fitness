import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class AppValidationPipe implements PipeTransform {
    async transform(value: object, { metatype }: ArgumentMetadata) {
        if (!metatype) {
            return value
        }
        const validationErrors = await this.getValidationErrors(value, metatype)
        const hasError = validationErrors.length !== 0
        if (!hasError) {
            return value
        }
        const errors = validationErrors
            .map((validationError) => this.adaptError(validationError))
            .reduce((accumulator, error) => ({
                ...accumulator,
                [error.property]: error.values
            }), {})
        throw new BadRequestException(errors)
    }

    private async getValidationErrors(
        value: object,
        metatype: NonNullable<ArgumentMetadata['metatype']>
    ) {
        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        return errors
    }

    private adaptError(
        error: Awaited<ReturnType<typeof validate>>[number]
    ) {
        return {
            property: error.property,
            values: Object
                .values(error.constraints!)
                .map((value) => value.split('|')[0])
        }
    }
}
