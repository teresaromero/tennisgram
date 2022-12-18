import { Bot, BotError, GrammyError, HttpError } from "grammy";
import { EnrollCallbackHandler, EnrollOptionCallbackRegex } from "./handlers/callback_enroll";
import { ScheduleCallbackHandler, ScheduleOptionCallbackRegex } from "./handlers/callback_schedule";
import { SeatsCallbackHandler, SeatsOptionCallbackRegex } from "./handlers/callback_seats";
import { EnrollCommandDescription, EnrollCommandHandler, EnrollCommandKeyword } from "./handlers/command_enroll";
import { PartidoCommandDescription, PartidoCommandHandler, PartidoCommandKeyword } from "./handlers/command_partido";
import { OnTextHandler } from "./handlers/on_text";

class BotEngine {
    private static instance: BotEngine
    private bot: Bot

    private constructor(token: string) {
        this.bot = new Bot(token, {
            botInfo: {
                is_bot: true,
                can_join_groups: true,
                can_read_all_group_messages: false,
                supports_inline_queries: false,
                id: 1,
                first_name: "",
                username: "myusername"
            }

        })
    }

    public static getInstance(token: string): BotEngine {
        if (!this.instance) {
            this.instance = new BotEngine(token);
        }
        return this.instance
    }


    private errHandler = (err: BotError) => {
        if (err instanceof GrammyError) {
            console.error("Error in request:", err.description);
        } else if (err instanceof HttpError) {
            console.error("Could not contact Telegram:", err);
        } else {
            console.error("Unknown error:", err);
        }
        throw err
    }

    private async loadCommands() {
        // set the description for all the commands
        this.bot.api.setMyCommands([
            { command: PartidoCommandKeyword, description: PartidoCommandDescription },
            { command: EnrollCommandKeyword, description: EnrollCommandDescription }
        ])

        this.bot.command(PartidoCommandKeyword, PartidoCommandHandler)
        this.bot.command(EnrollCommandKeyword, EnrollCommandHandler)

        this.bot.callbackQuery(ScheduleOptionCallbackRegex, ScheduleCallbackHandler)
        this.bot.callbackQuery(SeatsOptionCallbackRegex, SeatsCallbackHandler)
        this.bot.callbackQuery(EnrollOptionCallbackRegex, EnrollCallbackHandler)

        // handle input text to finalize or reply
        this.bot.on(":text", OnTextHandler)

        // handle any unknown callback query
        this.bot.on("callback_query:data", async (ctx) => {
            console.log("Unknown button event with payload", ctx.callbackQuery.data);
            await ctx.answerCallbackQuery(); // remove loading animation
        });

    }

    async init() {
        this.loadCommands()
        this.bot.catch(e => this.errHandler(e))
        await this.bot
            .start()
            .catch((err: BotError) => this.errHandler(err))
    }
}

export { BotEngine }
