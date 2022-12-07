import Config from "./config"
import InitBot from './bot'

function main(): void {
    InitBot(Config.TELEGRAM_API_KEY)
}


main()