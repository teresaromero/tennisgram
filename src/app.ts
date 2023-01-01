import bot from './bot'
import config from './config'

(async (): Promise<void> => {

    console.log("Starting bot engine...")
    return bot.Init(config.TELEGRAM_API_KEY)

})().catch(err => {

    console.log("Error while starting server...")
    console.log(err)
    process.exit(1)
})