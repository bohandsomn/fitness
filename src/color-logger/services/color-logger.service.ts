import { Injectable, OnModuleInit } from '@nestjs/common'
import chalk from 'chalk'

@Injectable()
export class ColorLoggerService implements OnModuleInit {
    onModuleInit() {
        chalk.level = 1
    }

    adapt<Data extends any[]>(...data: Data): string {
        if (data.length === 1) {
            return JSON.stringify(data[0], null, 4)
        }
        return JSON.stringify(data, null, 4)
    }

    info(...args: any[]): void {
        console.info(
            chalk.blue(
                this.adapt(...args)
            )
        )
    }

    warn(...args: any[]): void {
        console.warn(
            chalk.yellow(
                this.adapt(...args)
            )
        )
    }

    error(...args: any[]): void {
        console.error(
            chalk.red(
                this.adapt(...args)
            )
        )
    }

    success(...args: any[]): void {
        console.log(
            chalk.green(
                this.adapt(...args)
            )
        )
    }

    debug(...args: any[]): void {
        console.debug(
            chalk.bgGreen(
                this.adapt(...args)
            )
        )
    }
}
