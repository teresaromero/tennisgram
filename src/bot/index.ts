import { Bot } from "grammy";


// InitBot initializes the bot engine
const InitBot = async (token: string): Promise<void> => {

    const bot = new Bot(token);

    // Handle the /start command.
    bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

    // Handle the /start command.
    bot.command("nuevopartido", (ctx) => {
        const from = ctx.msg.from
        const msg = ctx.msg
        console.log(msg.text)

        return ctx.reply(`gracias ${from.first_name}`)
    });

    bot.on("message", (ctx) => ctx.reply("Hola default"));

    bot.catch(err => {
        throw err
    })

    return bot.start()
}

export default InitBot