import { InternalServerErrorException } from '@nestjs/common'
import { BuilderAi, IAi } from 'error-handler-ai'
import { config } from 'dotenv'
import path from 'path'
import { AppException } from '../../constants/app.exception.js'

config({
    path: path.resolve('.env.development')
})

export async function getSolution(error: unknown): Promise<void> {
    const bardCookie = process.env.BARD_COOKIE
    if (!bardCookie) {
        throw new InternalServerErrorException(AppException.AI_CREDENTIALS)
    }
    const ai: IAi = new BuilderAi()
        .setGoogle()
        .setGitHub()
        .setStackOverflow()
        .setBard({
            cookie: bardCookie,
        })
        .build()
    ai.catch(error, (solution) => process.stdout.write(solution))
}