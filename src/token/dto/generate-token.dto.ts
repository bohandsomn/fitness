export class GenerateTokenDTO {
    static isGenerateTokenDTO(data: unknown): data is GenerateTokenDTO {
        if (typeof data !== 'object' || data === null) {
            return false
        }
        if (
            typeof (data as GenerateTokenDTO).userId !== 'number' ||
            typeof (data as GenerateTokenDTO).isActive !== 'boolean'
        ) {
            return false
        }
        return true
    }

    readonly userId: number
    readonly isActive: boolean
}
