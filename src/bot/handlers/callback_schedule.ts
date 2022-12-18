import { Context } from "grammy"
import { ReadMatchByUID, UpdateMatch } from "../../storage/matches/crud"
import { Match } from "../../storage/matches/interfaces"
import { ScheduleOptionPrefix } from "../input/schedule"
import { AskForSeats } from "../input/seats"

export const ScheduleOptionCallbackRegex = new RegExp(`^${ScheduleOptionPrefix}`)

export const ScheduleCallbackHandler = async (ctx: Context) => {
    const data = ctx.callbackQuery.data

    // remove the keyboard from the callback query
    await ctx.editMessageReplyMarkup({ reply_markup: { inline_keyboard: [] } })

    // lookup matchID and save date
    const [_, selectedDate, matchID] = data.split("-", 3)
    const match: Match = await ReadMatchByUID(matchID)
    if (!match) {
        // reply: Match not found
    }
    match.date = parseInt(selectedDate)
    await UpdateMatch(match)

    // edit the message to keep response
    await ctx.editMessageText(`${ctx.msg.text} \nGuardado: ${new Date(match.date).toDateString()}`)

    await AskForSeats(ctx, match.UID)
}