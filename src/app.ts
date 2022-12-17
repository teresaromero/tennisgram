import { BotEngine } from './bot'
import config from './config'

const main = async () => {
    console.log("starting bot engine...")
    try {
        const bot = BotEngine.getInstance(config.TELEGRAM_API_KEY)
        await bot.init()
    } catch (err) {
        process.exit(1)
    }
}

main()