import { InlineKeyboard, Context } from "grammy"
import { InlineKeyboardButton } from "grammy/out/types.node"
import { Match } from "../../storage/matches/interfaces"

export const EnrollOptionPrefix = "ENROLL_MATCH_OPTION"


const enrollKeyboard = (matches: Match[]): InlineKeyboardButton[][] => {
    const keyboard = new InlineKeyboard()
    for (const m of matches) {
        keyboard.text(
            `${m.date} - ${m.place} - ${m.seats - m.players.length} plazas - ${m.notes}`,
            `${EnrollOptionPrefix}-${m.UID}`
        ).row()
    }
    return keyboard.inline_keyboard
}

export const AskToEnroll = (ctx: Context, matches: Match[]) => ctx.reply("Estos son los partidos disponibles, haz click en el que quieras apuntarte", {
    reply_markup: {
        inline_keyboard: enrollKeyboard(matches),
        selective: true
    }
})