import { Bot, GrammyError, HttpError } from "grammy";

class BotEngine {
    private static instance: BotEngine
    private bot: Bot

    private constructor(token: string) {
        this.bot = new Bot(token)
    }

    public static getInstance(token: string): BotEngine {
        if (!this.instance) {
            this.instance = new BotEngine(token);
        }
        return this.instance
    }

    public static errHandler(err: Error) {
        if (err instanceof GrammyError) {
            console.error("Error in request:", err.description);
        } else if (err instanceof HttpError) {
            console.error("Could not contact Telegram:", err);
        } else {
            console.error("Unknown error:", err);
        }
    }

    async init() {
        await this.bot.start()
    }
}

export { BotEngine }
