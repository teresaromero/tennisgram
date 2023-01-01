import { Bot, BotConfig, BotError, Context } from "grammy";
import handlers from "./handlers"

const defaultConfig: BotConfig<Context> = {}

// create returns an instance of bot with the given config and token
// token must be asked to BotFather
const create = (token: string, config: BotConfig<Context>): Bot => new Bot(token, config)

// Init creates a bot instance and starts listening
const Init = async (token: string, config?: BotConfig<Context>): Promise<void> => {

    // create new bot
    const bot = create(token, config || defaultConfig)

    await bot.api.setMyCommands([
        { command: "start", description: "description" }
    ])

    // commands start & help
    bot.command("start", ctx => {
        ctx
        
        ctx.reply("gracias", { reply_to_message_id: ctx.msg.message_id })})
    // bot.command("help", ctx => ctx.reply("gracias"))

    // unknown commands
    bot.on("msg::bot_command", ctx => ctx.reply("lalal"))

    // catch bot errors while running
    bot.catch(e => handlers.error(e))

    // start bot and catch any start error
    return bot
        .start()
        .catch((err: BotError) => handlers.error(err))
}

export default { Init }