export class ValidationError {
    static isValidationError(data: unknown): data is ValidationError {
        const response: Record<string, string[]> | undefined = (data as any)?.response
        const status: number | undefined = (data as any)?.status
        const message: string | undefined = (data as any)?.message
        const name: string | undefined = (data as any)?.name
        return typeof response === 'object' &&
            typeof status === 'number' &&
            typeof message === 'string' &&
            typeof name === 'string'
    }

    readonly response: Record<string, string[]>
    readonly status: number
    readonly message: string
    readonly name: string
}
