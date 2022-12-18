import { InlineKeyboard, Context } from "grammy"
import { InlineKeyboardButton } from "grammy/out/types.node"

export const ScheduleOptionPrefix = "SCHEDULE_DAY_OPTION"

const scheduleReplyText = "Parece que quieres registrar un nuevo partido.\n Para que día lo quieres planificar?"

const scheduleKeyboard = (matchID: string): InlineKeyboardButton[][] => {
    const today = new Date(Date.now())
    const keyboard = new InlineKeyboard()
    for (let i = 0; i <= 7; i++) {
        const dateOption = today.setDate(today.getDate() + i)
        const readableOption = new Date(dateOption).toDateString()

        keyboard.text(
            `${readableOption}`,
            `${ScheduleOptionPrefix}-${dateOption}-${matchID}`
        ).row()
    }
    return keyboard.inline_keyboard

}

export const AskForSchedule = (ctx: Context, matchID: string) => ctx.reply(scheduleReplyText, {
    reply_markup: {
        inline_keyboard: scheduleKeyboard(matchID),
        selective: true
    }
})
