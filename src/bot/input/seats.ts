import { Context } from "grammy"
import { InlineKeyboardButton } from "grammy/out/types"

export const SeatsOptionPrefix = "SEATS_OPTION"

const seatsReplyText = "Genial! ¿Es un partido de dobles o individual?"
const seatsKeyboard = (matchID: string): InlineKeyboardButton[][] => [[
    {
        text: "2",
        callback_data: `${SeatsOptionPrefix}-2-${matchID}`,
    },
    {
        text: "4",
        callback_data: `${SeatsOptionPrefix}-4-${matchID}`,
    },
]]

export const AskForSeats = async (ctx: Context, matchID: string) => ctx.reply(seatsReplyText, {
    reply_markup: {
        force_reply: true,
        one_time_keyboard: true,
        inline_keyboard: seatsKeyboard(matchID),
        selective: true
    }
})
